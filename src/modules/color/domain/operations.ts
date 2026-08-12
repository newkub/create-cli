/**
 * Color domain operations - Pure functions for color formatting
 */

import type {
	ColorFormat,
	ColorName,
	ColorPalette,
} from "#modules/color/types";

const ANSI_ESCAPE = "\x1b[";
const ANSI_RESET = "\x1b[0m";

const COLOR_CODES: Record<ColorName, ColorFormat> = {
	black: { ansi: "30", rgb: [0, 0, 0], hex: "#000000" },
	red: { ansi: "31", rgb: [255, 0, 0], hex: "#ff0000" },
	green: { ansi: "32", rgb: [0, 255, 0], hex: "#00ff00" },
	yellow: { ansi: "33", rgb: [255, 255, 0], hex: "#ffff00" },
	blue: { ansi: "34", rgb: [0, 0, 255], hex: "#0000ff" },
	magenta: { ansi: "35", rgb: [255, 0, 255], hex: "#ff00ff" },
	cyan: { ansi: "36", rgb: [0, 255, 255], hex: "#00ffff" },
	white: { ansi: "37", rgb: [255, 255, 255], hex: "#ffffff" },
	gray: { ansi: "90", rgb: [128, 128, 128], hex: "#808080" },
	grey: { ansi: "90", rgb: [128, 128, 128], hex: "#808080" },
	brightBlack: { ansi: "90", rgb: [128, 128, 128], hex: "#808080" },
	brightRed: { ansi: "91", rgb: [255, 128, 128], hex: "#ff8080" },
	brightGreen: { ansi: "92", rgb: [128, 255, 128], hex: "#80ff80" },
	brightYellow: { ansi: "93", rgb: [255, 255, 128], hex: "#ffff80" },
	brightBlue: { ansi: "94", rgb: [128, 128, 255], hex: "#8080ff" },
	brightMagenta: { ansi: "95", rgb: [255, 128, 255], hex: "#ff80ff" },
	brightCyan: { ansi: "96", rgb: [128, 255, 255], hex: "#80ffff" },
	brightWhite: { ansi: "97", rgb: [255, 255, 255], hex: "#ffffff" },
};

const MODIFIER_CODES: Record<string, string> = {
	bold: "1",
	dim: "2",
	italic: "3",
	underline: "4",
	blink: "5",
	inverse: "7",
	hidden: "8",
	strikethrough: "9",
};

export const getColorCode = (color: ColorName): ColorFormat =>
	COLOR_CODES[color];

export const getModifierCode = (modifier: string): string =>
	MODIFIER_CODES[modifier] || "";

export const applyColorFormatting = (
	text: string,
	color?: ColorName,
	backgroundColor?: ColorName,
	modifiers?: readonly string[],
): string => {
	const codes: string[] = [];

	if (color) {
		codes.push(getColorCode(color).ansi);
	}

	if (backgroundColor) {
		codes.push(
			(parseInt(getColorCode(backgroundColor).ansi, 10) + 10).toString(),
		);
	}

	if (modifiers) {
		codes.push(...modifiers.map(getModifierCode));
	}

	if (codes.length === 0) return text;

	return `${ANSI_ESCAPE}${codes.join(";")}m${text}${ANSI_RESET}`;
};

export const stripAnsiCodes = (text: string): string => {
	// biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escape sequence is intentional
	return text.replace(/\u001b\u005b[[0-9;]*m/g, "");
};

export const createColorPalette = (): ColorPalette => ({
	colors: COLOR_CODES,
	modifiers: MODIFIER_CODES,
});
