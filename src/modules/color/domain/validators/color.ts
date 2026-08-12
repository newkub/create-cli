/**
 * Color validation functions
 */

import type { BgColorName, ColorName } from "#shared/types";

/**
 * Validate color combination - business rule
 */
export function validateColorCombination(
	color?: ColorName,
	bgColor?: BgColorName,
): boolean {
	if (!color && !bgColor) return false;
	if (!color || !bgColor) return true;

	// Business rule: avoid certain combinations that are hard to read
	const poorContrast: Record<ColorName, ColorName[]> = {
		black: ["black"],
		red: [],
		green: [],
		yellow: [],
		blue: [],
		magenta: [],
		cyan: [],
		white: ["white"],
		gray: ["gray"],
		grey: ["grey"],
		brightBlack: ["black"],
		brightRed: [],
		brightGreen: [],
		brightYellow: [],
		brightBlue: [],
		brightMagenta: [],
		brightCyan: [],
		brightWhite: ["white"],
	};

	return !poorContrast[color]?.includes(bgColor);
}
