/**
 * Argument parser - parses CLI arguments into positional, flags, and options
 * Supports: positional args, --flags, -short, --flag=value, --flag value
 */

export interface ParsedArgs {
	/** Positional arguments (in order) */
	positionals: string[];
	/** Boolean flags (--verbose, -v) */
	flags: Set<string>;
	/** Key-value options (--output=file.txt, -o file.txt) */
	options: Map<string, string>;
	/** Unknown arguments that didn't match any pattern */
	unknown: string[];
}

/** Short flag to long flag mapping */
export type AliasMap = Record<string, string>;

export interface ParseOptions {
	aliases?: AliasMap;
	/** Flags that are boolean (don't consume next arg as value) */
	booleanFlags?: Set<string>;
	/** Stop parsing at first unknown positional (rest go to positionals) */
	stopAtFirstPositional?: boolean;
	/** Allow -- to stop flag parsing */
	allowDashDash?: boolean;
}

const isLongFlag = (arg: string): boolean => arg.startsWith("--") && arg.length > 2;
const isShortFlag = (arg: string): boolean =>
	arg.startsWith("-") && arg.length > 1 && !arg.startsWith("--") && !arg.match(/^-?\d/);
const isFlagWithValue = (arg: string): boolean => arg.includes("=") && arg.startsWith("-");

/**
 * Parse command-line arguments into structured data
 */
export const parse = (
	args: readonly string[],
	options: ParseOptions = {},
): ParsedArgs => {
	const {
		aliases = {},
		booleanFlags = new Set(),
		stopAtFirstPositional = false,
		allowDashDash = true,
	} = options;

	const result: ParsedArgs = {
		positionals: [],
		flags: new Set(),
		options: new Map(),
		unknown: [],
	};

	let i = 0;
	let dashDashSeen = false;

	while (i < args.length) {
		const arg = args[i]!;

		// Handle -- (stop parsing flags)
		if (arg === "--" && allowDashDash && !dashDashSeen) {
			dashDashSeen = true;
			i++;
			continue;
		}

		// After --, everything is positional
		if (dashDashSeen) {
			result.positionals.push(arg);
			i++;
			continue;
		}

		// Long flag with = sign: --flag=value
		if (isFlagWithValue(arg) && isLongFlag(arg)) {
			const eqIdx = arg.indexOf("=");
			const key = arg.slice(2, eqIdx);
			const value = arg.slice(eqIdx + 1);
			const resolvedKey = aliases[key] ?? key;
			result.options.set(resolvedKey, value);
			i++;
			continue;
		}

		// Long flag without =: --flag
		if (isLongFlag(arg)) {
			const key = arg.slice(2);
			const resolvedKey = aliases[key] ?? key;

			if (booleanFlags.has(resolvedKey)) {
				result.flags.add(resolvedKey);
				i++;
			} else {
				// Check if next arg is a value
				const nextArg = args[i + 1];
				if (nextArg !== undefined && !isLongFlag(nextArg) && !isShortFlag(nextArg)) {
					result.options.set(resolvedKey, nextArg);
					i += 2;
				} else {
					result.flags.add(resolvedKey);
					i++;
				}
			}
			continue;
		}

		// Short flag with = sign: -f=value
		if (isFlagWithValue(arg) && isShortFlag(arg)) {
			const eqIdx = arg.indexOf("=");
			const key = arg.slice(1, eqIdx);
			const value = arg.slice(eqIdx + 1);
			const resolvedKey = aliases[key] ?? key;
			result.options.set(resolvedKey, value);
			i++;
			continue;
		}

		// Short flag: -f
		if (isShortFlag(arg)) {
			const key = arg.slice(1);
			const resolvedKey = aliases[key] ?? key;

			if (booleanFlags.has(resolvedKey)) {
				result.flags.add(resolvedKey);
				i++;
			} else {
				// Check if next arg is a value
				const nextArg = args[i + 1];
				if (nextArg !== undefined && !isLongFlag(nextArg) && !isShortFlag(nextArg)) {
					result.options.set(resolvedKey, nextArg);
					i += 2;
				} else {
					result.flags.add(resolvedKey);
					i++;
				}
			}
			continue;
		}

		// Positional argument
		if (stopAtFirstPositional) {
			result.positionals.push(...args.slice(i));
			break;
		}
		result.positionals.push(arg);
		i++;
	}

	return result;
};

/**
 * Get an option value with a default
 */
export const getOption = (
	parsed: ParsedArgs,
	key: string,
	defaultValue?: string,
): string | undefined => {
	return parsed.options.get(key) ?? defaultValue;
};

/**
 * Check if a flag is set
 */
export const hasFlag = (parsed: ParsedArgs, flag: string): boolean =>
	parsed.flags.has(flag);

/**
 * Get a positional argument by index
 */
export const getPositional = (
	parsed: ParsedArgs,
	index: number,
	defaultValue?: string,
): string | undefined => {
	return parsed.positionals[index] ?? defaultValue;
};
