/**
 * Box domain operations - Pure functions for box rendering
 */

import type {
	BorderCharacter,
	BorderStyle,
	BoxOptions,
	BoxRender,
} from "#modules/box/types";
import { padCenter, repeat } from "#shared/utils";

const BORDER_CHARS: Record<BorderStyle, BorderCharacter> = {
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

export const getBorderChars = (style: BorderStyle): BorderCharacter =>
	BORDER_CHARS[style];

export const createBox = (options: BoxOptions): BoxRender => {
	const {
		width = 40,
		height = 10,
		border = "single",
		padding = 0,
		margin = 0,
		content = "",
	} = options;

	const borderChars = getBorderChars(border);
	const innerWidth = Math.max(1, width - 2 - padding * 2);
	const innerHeight = Math.max(1, height - 2 - padding * 2);

	// Process content lines
	const contentLines = content.split("\n");
	const processedLines: string[] = [];

	// Add top margin
	for (let i = 0; i < margin; i++) {
		processedLines.push(repeat(" ", width));
	}

	// Top border
	const topBorder =
		borderChars.topLeft +
		repeat(borderChars.horizontal, innerWidth + padding * 2) +
		borderChars.topRight;
	processedLines.push(padCenter(topBorder, width));

	// Content area with padding
	const paddingSpace = repeat(" ", padding);
	for (let i = 0; i < innerHeight; i++) {
		const lineContent = contentLines[i] || "";
		const paddedContent = padCenter(lineContent, innerWidth);
		const fullLine =
			borderChars.vertical +
			paddingSpace +
			paddedContent +
			paddingSpace +
			borderChars.vertical;
		processedLines.push(padCenter(fullLine, width));
	}

	// Bottom border
	const bottomBorder =
		borderChars.bottomLeft +
		repeat(borderChars.horizontal, innerWidth + padding * 2) +
		borderChars.bottomRight;
	processedLines.push(padCenter(bottomBorder, width));

	// Add bottom margin
	for (let i = 0; i < margin; i++) {
		processedLines.push(repeat(" ", width));
	}

	return {
		lines: processedLines,
		size: { width, height },
	};
};

export const renderBox = (options: BoxOptions): string =>
	createBox(options).lines.join("\n");

export const validateBoxOptions = (options: BoxOptions): boolean => {
	const { width, height, padding, margin } = options;

	if (width !== undefined && width <= 0) return false;
	if (height !== undefined && height <= 0) return false;
	if (padding !== undefined && padding < 0) return false;
	if (margin !== undefined && margin < 0) return false;

	return true;
};
