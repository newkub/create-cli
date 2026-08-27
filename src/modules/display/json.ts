/**
 * JSON renderer - pretty-print JSON with syntax highlighting
 */

const RESET = "\x1b[0m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const MAGENTA = "\x1b[35m";
const BLUE = "\x1b[34m";
const DIM = "\x1b[2m";

export interface JsonOptions {
	/** The JSON data to render (object, array, or primitive) */
	data: unknown;
	/** Indent size (number of spaces) */
	indent?: number;
	/** Whether to use syntax highlighting */
	colorize?: boolean;
	/** Maximum depth for nesting */
	maxDepth?: number;
}

/**
 * Render JSON with syntax highlighting
 */
export const renderJson = (options: JsonOptions): string => {
	const { data, indent = 2, colorize = true, maxDepth = 10 } = options;
	return stringifyJson(data, 0, indent, colorize, maxDepth);
};

/**
 * Recursively stringify JSON with optional syntax highlighting
 */
const stringifyJson = (
	value: unknown,
	level: number,
	indent: number,
	colorize: boolean,
	maxDepth: number,
): string => {
	const spaces = " ".repeat(level * indent);
	const childSpaces = " ".repeat((level + 1) * indent);

	if (value === null) {
		return colorize ? `${DIM}null${RESET}` : "null";
	}

	if (value === undefined) {
		return colorize ? `${DIM}undefined${RESET}` : "undefined";
	}

	if (typeof value === "boolean") {
		return colorize ? `${MAGENTA}${value}${RESET}` : String(value);
	}

	if (typeof value === "number") {
		return colorize ? `${BLUE}${value}${RESET}` : String(value);
	}

	if (typeof value === "string") {
		return colorize
			? `${GREEN}"${escapeString(value)}"${RESET}`
			: `"${escapeString(value)}"`;
	}

	if (typeof value === "bigint") {
		return colorize ? `${BLUE}${value}n${RESET}` : `${value}n`;
	}

	if (level >= maxDepth) {
		return colorize ? `${DIM}...${RESET}` : "...";
	}

	if (Array.isArray(value)) {
		if (value.length === 0) return "[]";

		const items = value.map((item) => {
			return `${childSpaces}${stringifyJson(item, level + 1, indent, colorize, maxDepth)}`;
		});
		return `[\n${items.join(",\n")}\n${spaces}]`;
	}

	if (typeof value === "object") {
		const entries = Object.entries(value as Record<string, unknown>);
		if (entries.length === 0) return "{}";

		const pairs = entries.map(([key, val]) => {
			const keyStr = colorize
				? `${CYAN}"${escapeString(key)}"${RESET}`
				: `"${escapeString(key)}"`;
			return `${childSpaces}${keyStr}: ${stringifyJson(val, level + 1, indent, colorize, maxDepth)}`;
		});
		return `{\n${pairs.join(",\n")}\n${spaces}}`;
	}

	return String(value);
};

/**
 * Escape special characters in JSON strings
 */
const escapeString = (str: string): string =>
	str
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\n/g, "\\n")
		.replace(/\r/g, "\\r")
		.replace(/\t/g, "\\t");
