/**
 * Colors convenience object - Provides chainable color methods
 * Mimics common terminal color libraries API
 */

import { applyColorFormatting } from "#modules/color/domain/operations";
import type { ColorName } from "#modules/color/types";

/**
 * Create a colored text function for a specific color
 */
const createColorFn =
	(color: ColorName) =>
	(text: string): string =>
		applyColorFormatting(text, color);

/**
 * Create a background color function for a specific color
 */
const createBgColorFn =
	(color: ColorName) =>
	(text: string): string =>
		applyColorFormatting(text, undefined, color);

/**
 * Colors object with methods for each color
 * Usage: Colors.red("text"), Colors.green("text"), etc.
 */
export const Colors = {
	// Basic colors
	black: createColorFn("black"),
	red: createColorFn("red"),
	green: createColorFn("green"),
	yellow: createColorFn("yellow"),
	blue: createColorFn("blue"),
	magenta: createColorFn("magenta"),
	cyan: createColorFn("cyan"),
	white: createColorFn("white"),
	gray: createColorFn("gray"),
	grey: createColorFn("grey"),

	// Background colors
	bgBlack: createBgColorFn("black"),
	bgRed: createBgColorFn("red"),
	bgGreen: createBgColorFn("green"),
	bgYellow: createBgColorFn("yellow"),
	bgBlue: createBgColorFn("blue"),
	bgMagenta: createBgColorFn("magenta"),
	bgCyan: createBgColorFn("cyan"),
	bgWhite: createBgColorFn("white"),
	bgGray: createBgColorFn("gray"),
	bgGrey: createBgColorFn("grey"),

	// Bright colors
	brightRed: createColorFn("brightRed"),
	brightGreen: createColorFn("brightGreen"),
	brightYellow: createColorFn("brightYellow"),
	brightBlue: createColorFn("brightBlue"),
	brightMagenta: createColorFn("brightMagenta"),
	brightCyan: createColorFn("brightCyan"),
	brightWhite: createColorFn("brightWhite"),

	// Modifiers (return functions that take color)
	bold: (text: string): string =>
		applyColorFormatting(text, undefined, undefined, ["bold"]),
	dim: (text: string): string =>
		applyColorFormatting(text, undefined, undefined, ["dim"]),
	italic: (text: string): string =>
		applyColorFormatting(text, undefined, undefined, ["italic"]),
	underline: (text: string): string =>
		applyColorFormatting(text, undefined, undefined, ["underline"]),
	strikethrough: (text: string): string =>
		applyColorFormatting(text, undefined, undefined, ["strikethrough"]),

	// Custom color with options
	custom: (
		text: string,
		color?: ColorName,
		backgroundColor?: ColorName,
		modifiers?: readonly string[],
	): string => applyColorFormatting(text, color, backgroundColor, modifiers),
} as const;

export type ColorsType = typeof Colors;
