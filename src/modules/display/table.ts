/**
 * Table renderer - renders tables with column alignment, borders, and colors
 */

export interface TableColumn {
	/** Column header */
	header: string;
	/** Column alignment */
	align?: "left" | "right" | "center";
	/** Custom color for this column (ANSI code) */
	color?: string;
	/** Minimum width */
	minWidth?: number;
	/** Maximum width (truncates with ellipsis) */
	maxWidth?: number;
}

export type TableRow = Record<
	string,
	string | number | boolean | null | undefined
>;

export interface TableOptions {
	/** Column definitions */
	columns: TableColumn[];
	/** Table data rows */
	rows: TableRow[];
	/** Border style */
	border?: "none" | "single" | "double" | "rounded" | "markdown";
	/** Show header row */
	showHeader?: boolean;
	/** Padding between cell content and border */
	padding?: number;
	/** Header color (ANSI code) */
	headerColor?: string;
	/** Border color (ANSI code) */
	borderColor?: string;
}

const RESET = "\x1b[0m";

const borderChars = {
	single: {
		topLeft: "┌",
		topRight: "┐",
		topJoin: "┬",
		topLeftMid: "├",
		topRightMid: "┤",
		bottomLeft: "└",
		bottomRight: "┘",
		bottomJoin: "┴",
		midJoin: "┼",
		horizontal: "─",
		vertical: "│",
		leftMid: "├",
		rightMid: "┤",
	},
	double: {
		topLeft: "╔",
		topRight: "╗",
		topJoin: "╦",
		topLeftMid: "╠",
		topRightMid: "╣",
		bottomLeft: "╚",
		bottomRight: "╝",
		bottomJoin: "╩",
		midJoin: "╬",
		horizontal: "═",
		vertical: "║",
		leftMid: "╠",
		rightMid: "╣",
	},
	rounded: {
		topLeft: "╭",
		topRight: "╮",
		topJoin: "┬",
		topLeftMid: "├",
		topRightMid: "┤",
		bottomLeft: "╰",
		bottomRight: "╯",
		bottomJoin: "┴",
		midJoin: "┼",
		horizontal: "─",
		vertical: "│",
		leftMid: "├",
		rightMid: "┤",
	},
	markdown: {
		topLeft: "",
		topRight: "",
		topJoin: "",
		topLeftMid: "",
		topRightMid: "",
		bottomLeft: "",
		bottomRight: "",
		bottomJoin: "",
		midJoin: "",
		horizontal: "-",
		vertical: "|",
		leftMid: "|",
		rightMid: "|",
	},
	none: {
		topLeft: "",
		topRight: "",
		topJoin: "",
		topLeftMid: "",
		topRightMid: "",
		bottomLeft: "",
		bottomRight: "",
		bottomJoin: "",
		midJoin: "",
		horizontal: " ",
		vertical: " ",
		leftMid: " ",
		rightMid: " ",
	},
};

const padString = (
	str: string,
	width: number,
	align: "left" | "right" | "center" = "left",
): string => {
	if (str.length >= width) return str;
	const diff = width - str.length;
	if (align === "right") {
		return " ".repeat(diff) + str;
	}
	if (align === "center") {
		const left = Math.floor(diff / 2);
		const right = diff - left;
		return " ".repeat(left) + str + " ".repeat(right);
	}
	return str + " ".repeat(diff);
};

const truncate = (str: string, maxLen: number): string => {
	if (str.length <= maxLen) return str;
	return `${str.slice(0, maxLen - 3)}...`;
};

/**
 * Render a table from column definitions and row data
 */
export const renderTable = (options: TableOptions): string => {
	const {
		columns,
		rows,
		border = "single",
		showHeader = true,
		padding = 1,
		headerColor = "\x1b[1m",
		borderColor = "",
	} = options;

	const chars = borderChars[border];
	const pad = " ".repeat(padding);

	// Calculate column widths
	const widths = columns.map((col, idx) => {
		const headerWidth = col.header.length;
		const dataWidth = Math.max(
			...rows.map((row) => {
				const key = Object.keys(row)[idx] ?? col.header;
				const value = row[key];
				return value !== null && value !== undefined ? String(value).length : 0;
			}),
			0,
		);
		const minW = col.minWidth ?? 0;
		const maxW = col.maxWidth ?? Infinity;
		return Math.min(Math.max(headerWidth, dataWidth, minW), maxW);
	});

	const lines: string[] = [];

	// Top border
	if (border !== "none" && border !== "markdown") {
		const top =
			chars.topLeft +
			widths
				.map((w) => chars.horizontal.repeat(w + padding * 2))
				.join(chars.topJoin) +
			chars.topRight;
		lines.push(borderColor ? `${borderColor}${top}${RESET}` : top);
	}

	// Header row
	if (showHeader) {
		const headerCells = columns.map((col, idx) => {
			const text = truncate(col.header, widths[idx]!);
			const padded = padString(text, widths[idx]!, col.align);
			const colored = col.color ? `${col.color}${padded}${RESET}` : padded;
			return `${pad}${headerColor}${colored}${RESET}${pad}`;
		});
		const headerLine =
			chars.vertical + headerCells.join(chars.vertical) + chars.vertical;
		lines.push(headerLine);

		// Header separator
		if (border === "markdown") {
			const sep = `|${widths.map((w) => "-".repeat(w + padding * 2)).join("|")}|`;
			lines.push(sep);
		} else if (border !== "none") {
			const sep =
				chars.leftMid +
				widths
					.map((w) => chars.horizontal.repeat(w + padding * 2))
					.join(chars.midJoin) +
				chars.rightMid;
			lines.push(borderColor ? `${borderColor}${sep}${RESET}` : sep);
		}
	}

	// Data rows
	for (const row of rows) {
		const cells = columns.map((col, idx) => {
			const key = Object.keys(row)[idx] ?? col.header;
			const value = row[key];
			const text = value !== null && value !== undefined ? String(value) : "";
			const truncated = truncate(text, widths[idx]!);
			const padded = padString(truncated, widths[idx]!, col.align);
			const colored = col.color ? `${col.color}${padded}${RESET}` : padded;
			return `${pad}${colored}${pad}`;
		});
		const rowLine =
			chars.vertical + cells.join(chars.vertical) + chars.vertical;
		lines.push(rowLine);
	}

	// Bottom border
	if (border !== "none" && border !== "markdown") {
		const bottom =
			chars.bottomLeft +
			widths
				.map((w) => chars.horizontal.repeat(w + padding * 2))
				.join(chars.bottomJoin) +
			chars.bottomRight;
		lines.push(borderColor ? `${borderColor}${bottom}${RESET}` : bottom);
	}

	return lines.join("\n");
};
