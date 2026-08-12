/**
 * Box Component Domain Operations
 * Pure functions for box rendering
 */

export interface BoxProps {
	width?: number;
	height?: number;
	borderStyle?: "single" | "double" | "rounded" | "dashed" | "dotted";
	padding?: number;
	margin?: number;
	align?: "left" | "center" | "right";
}

const BORDER_CHARS = {
	single: {
		topLeft: "┌",
		topRight: "┐",
		bottomLeft: "└",
		bottomRight: "┘",
		horizontal: "─",
		vertical: "│",
	},
	double: {
		topLeft: "╔",
		topRight: "╗",
		bottomLeft: "╚",
		bottomRight: "╝",
		horizontal: "═",
		vertical: "║",
	},
	rounded: {
		topLeft: "╭",
		topRight: "╮",
		bottomLeft: "╰",
		bottomRight: "╯",
		horizontal: "─",
		vertical: "│",
	},
	dashed: {
		topLeft: "┌",
		topRight: "┐",
		bottomLeft: "└",
		bottomRight: "┘",
		horizontal: "┄",
		vertical: "┊",
	},
	dotted: {
		topLeft: "┌",
		topRight: "┐",
		bottomLeft: "└",
		bottomRight: "┘",
		horizontal: "┈",
		vertical: "┆",
	},
};

export const renderBox = (props: BoxProps, children?: string): string => {
	const {
		width = 40,
		height = 10,
		borderStyle = "single",
		padding = 0,
		margin = 0,
		align = "left",
	} = props;

	const border = BORDER_CHARS[borderStyle];
	const innerWidth = Math.max(1, width - 2 - padding * 2);
	const innerHeight = Math.max(1, height - 2 - padding * 2);

	const content = children || "";
	const contentLines = content.split("\n");
	const lines: string[] = [];

	// Top margin
	for (let i = 0; i < margin; i++) {
		lines.push(" ".repeat(width));
	}

	// Top border
	const topBorder =
		border.topLeft +
		border.horizontal.repeat(innerWidth + padding * 2) +
		border.topRight;
	lines.push(
		topBorder.padStart(width + Math.floor((width - topBorder.length) / 2)),
	);

	// Content area
	const paddingSpace = " ".repeat(padding);
	for (let i = 0; i < innerHeight; i++) {
		let lineContent = contentLines[i] || "";

		if (align === "center") {
			lineContent = lineContent.padStart(
				Math.floor((innerWidth + lineContent.length) / 2),
			);
		} else if (align === "right") {
			lineContent = lineContent.padStart(innerWidth);
		} else {
			lineContent = lineContent.padEnd(innerWidth);
		}

		const fullLine =
			border.vertical +
			paddingSpace +
			lineContent +
			paddingSpace +
			border.vertical;
		lines.push(fullLine);
	}

	// Bottom border
	const bottomBorder =
		border.bottomLeft +
		border.horizontal.repeat(innerWidth + padding * 2) +
		border.bottomRight;
	lines.push(
		bottomBorder.padStart(
			width + Math.floor((width - bottomBorder.length) / 2),
		),
	);

	// Bottom margin
	for (let i = 0; i < margin; i++) {
		lines.push(" ".repeat(width));
	}

	return lines.join("\n");
};
