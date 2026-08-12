/**
 * Color constants - pure data
 */

import type { BgColorName, ColorName, ModifierName } from "#shared/types";

// ANSI escape codes
export const ANSI_RESET = "\x1b[0m";
export const ANSI_ESCAPE = "\x1b[";

// Color codes
export const COLOR_CODES: Record<ColorName, number> = {
	black: 30,
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34,
	magenta: 35,
	cyan: 36,
	white: 37,
	gray: 90,
	grey: 90,
	brightBlack: 90,
	brightRed: 91,
	brightGreen: 92,
	brightYellow: 93,
	brightBlue: 94,
	brightMagenta: 95,
	brightCyan: 96,
	brightWhite: 97,
} as const;

export const MODIFIER_CODES: Record<ModifierName, number> = {
	bold: 1,
	dim: 2,
	italic: 3,
	underline: 4,
	inverse: 7,
	hidden: 8,
	strikethrough: 9,
} as const;

export const BG_COLOR_CODES: Record<BgColorName, number> = {
	black: 40,
	red: 41,
	green: 42,
	yellow: 43,
	blue: 44,
	magenta: 45,
	cyan: 46,
	white: 47,
	gray: 100,
	grey: 100,
	brightBlack: 100,
	brightRed: 101,
	brightGreen: 102,
	brightYellow: 103,
	brightBlue: 104,
	brightMagenta: 105,
	brightCyan: 106,
	brightWhite: 107,
} as const;

// Poor contrast combinations
export const POOR_CONTRAST: Record<ColorName, ColorName[]> = {
	black: ["black"],
	white: ["white", "brightWhite"],
	gray: ["gray"],
	grey: ["grey"],
	brightBlack: ["black", "brightBlack"],
	brightWhite: ["white", "brightWhite"],
	red: ["brightRed"],
	green: ["brightGreen"],
	yellow: ["brightYellow"],
	blue: ["brightBlue"],
	magenta: ["brightMagenta"],
	cyan: ["brightCyan"],
	brightRed: ["red"],
	brightGreen: ["green"],
	brightYellow: ["yellow"],
	brightBlue: ["blue"],
	brightMagenta: ["magenta"],
	brightCyan: ["cyan"],
};

// Export as COLOR_CONSTANTS for backward compatibility
export const COLOR_CONSTANTS = {
	ANSI_RESET,
	ANSI_ESCAPE,
	COLOR_CODES,
	MODIFIER_CODES,
	BG_COLOR_CODES,
	POOR_CONTRAST,
};
