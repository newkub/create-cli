/**
 * Key-value renderer - renders key-value pairs in a formatted layout
 */

const RESET = "\x1b[0m";

export interface KeyValueEntry {
	key: string;
	value: string | number | boolean | null | undefined;
	keyColor?: string;
	valueColor?: string;
}

export interface KeyValueOptions {
	/** Entries to render */
	entries: KeyValueEntry[];
	/** Separator between key and value */
	separator?: string;
	/** Alignment for keys */
	keyAlign?: "left" | "right";
	/** Color for keys */
	keyColor?: string;
	/** Color for values */
	valueColor?: string;
	/** Whether to align values in a column */
	alignValues?: boolean;
	/** Prefix for each line */
	prefix?: string;
}

/**
 * Render key-value pairs in a formatted layout
 */
export const renderKeyValue = (options: KeyValueOptions): string => {
	const {
		entries,
		separator = ":",
		keyAlign = "left",
		keyColor = "\x1b[36m",
		valueColor = "\x1b[37m",
		alignValues = true,
		prefix = "",
	} = options;

	// Calculate max key width for alignment
	const maxKeyWidth = alignValues
		? Math.max(...entries.map((e) => e.key.length))
		: 0;

	const lines: string[] = [];

	for (const entry of entries) {
		const kColor = entry.keyColor ?? keyColor;
		const vColor = entry.valueColor ?? valueColor;
		const value =
			entry.value === null || entry.value === undefined
				? ""
				: String(entry.value);

		const paddedKey = alignValues
			? keyAlign === "right"
				? entry.key.padStart(maxKeyWidth)
				: entry.key.padEnd(maxKeyWidth)
			: entry.key;

		lines.push(
			`${prefix}${kColor}${paddedKey}${RESET}${separator} ${vColor}${value}${RESET}`,
		);
	}

	return lines.join("\n");
};
