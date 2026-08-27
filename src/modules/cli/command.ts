/**
 * Command class - defines a CLI command with options, arguments, and action handler
 */

import { generateHelp } from "./help";
import { type ParsedArgs, type ParseOptions, parse } from "./parser";

export interface CommandOption {
	/** Long name (without --) */
	name: string;
	/** Short alias (single char, without -) */
	short?: string;
	/** Description for help text */
	description: string;
	/** Whether this option takes a value */
	takesValue?: boolean;
	/** Default value if not provided */
	defaultValue?: string;
	/** Whether this option is required */
	required?: boolean;
}

export interface CommandArgument {
	/** Argument name */
	name: string;
	/** Description for help text */
	description: string;
	/** Whether this argument is required */
	required?: boolean;
	/** Whether this argument can be repeated (variadic) */
	variadic?: boolean;
}

export type ActionHandler = (
	args: ParsedArgs,
	command: Command,
) => void | Promise<void>;

export class Command {
	name: string;
	description: string = "";
	private options: CommandOption[] = [];
	private arguments: CommandArgument[] = [];
	private actionHandler?: ActionHandler;
	private subcommands: Map<string, Command> = new Map();
	private parent?: Command;
	private version?: string;

	constructor(name: string, description?: string) {
		this.name = name;
		if (description) this.description = description;
	}

	/**
	 * Set the command description
	 */
	desc(description: string): this {
		this.description = description;
		return this;
	}

	/**
	 * Set the command version
	 */
	versionInfo(version: string): this {
		this.version = version;
		return this;
	}

	/**
	 * Add an option
	 */
	option(option: CommandOption): this {
		this.options.push(option);
		return this;
	}

	/**
	 * Add a positional argument
	 */
	arg(argument: CommandArgument): this {
		this.arguments.push(argument);
		return this;
	}

	/**
	 * Set the action handler
	 */
	action(handler: ActionHandler): this {
		this.actionHandler = handler;
		return this;
	}

	/**
	 * Add a subcommand
	 */
	subcommand(cmd: Command): this {
		cmd.parent = this;
		this.subcommands.set(cmd.name, cmd);
		return this;
	}

	/**
	 * Get all options
	 */
	getOptions(): CommandOption[] {
		return this.options;
	}

	/**
	 * Get all arguments
	 */
	getArguments(): CommandArgument[] {
		return this.arguments;
	}

	/**
	 * Get all subcommands
	 */
	getSubcommands(): Command[] {
		return Array.from(this.subcommands.values());
	}

	/**
	 * Get parent command
	 */
	getParent(): Command | undefined {
		return this.parent;
	}

	/**
	 * Get version
	 */
	getVersion(): string | undefined {
		return this.version;
	}

	/**
	 * Find a subcommand by name
	 */
	findSubcommand(name: string): Command | undefined {
		return this.subcommands.get(name);
	}

	/**
	 * Generate help text for this command
	 */
	help(): string {
		return generateHelp(this);
	}

	/**
	 * Parse arguments and execute the command
	 */
	async run(argv?: string[]): Promise<void> {
		const args = argv ?? process.argv.slice(2);

		// Check for subcommand
		if (args.length > 0 && this.subcommands.has(args[0]!)) {
			const subcmd = this.subcommands.get(args[0]!)!;
			await subcmd.run(args.slice(1));
			return;
		}

		// Check for help flag
		if (args.includes("--help") || args.includes("-h")) {
			process.stdout.write(`${this.help()}\n`);
			return;
		}

		// Check for version flag
		if (this.version && (args.includes("--version") || args.includes("-V"))) {
			process.stdout.write(`${this.name} ${this.version}\n`);
			return;
		}

		// Build parse options from command definition
		const aliases: Record<string, string> = {};
		const booleanFlags = new Set<string>();

		for (const opt of this.options) {
			if (opt.short) {
				aliases[opt.short] = opt.name;
			}
			if (!opt.takesValue) {
				booleanFlags.add(opt.name);
				if (opt.short) booleanFlags.add(opt.short);
			}
		}

		const parseOptions: ParseOptions = { aliases, booleanFlags };
		const parsed = parse(args, parseOptions);

		// Validate required options
		for (const opt of this.options) {
			if (opt.required) {
				if (opt.takesValue && !parsed.options.has(opt.name)) {
					process.stderr.write(
						`Error: Missing required option --${opt.name}\n`,
					);
					process.exit(1);
				}
			}
		}

		// Validate required arguments
		for (let i = 0; i < this.arguments.length; i++) {
			const arg = this.arguments[i]!;
			if (arg.required && !parsed.positionals[i]) {
				process.stderr.write(
					`Error: Missing required argument <${arg.name}>\n`,
				);
				process.exit(1);
			}
		}

		// Execute action
		if (this.actionHandler) {
			await this.actionHandler(parsed, this);
		}
	}
}
