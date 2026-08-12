/**
 * Color module types
 */

import type { BgColorName, StyleModifier } from "#shared/types";

export type ColorName =
	| "black"
	| "red"
	| "green"
	| "yellow"
	| "blue"
	| "magenta"
	| "cyan"
	| "white"
	| "gray"
	| "grey"
	| "brightBlack"
	| "brightRed"
	| "brightGreen"
	| "brightYellow"
	| "brightBlue"
	| "brightMagenta"
	| "brightCyan"
	| "brightWhite";

export type ColorValue = ColorName | string;

export interface ColorFormat {
	readonly ansi: string;
	readonly rgb: [number, number, number];
	readonly hex: string;
}

export interface ColorPalette {
	readonly colors: Record<ColorName, ColorFormat>;
	readonly modifiers: Record<StyleModifier, string>;
}

export interface ColorConfig {
	readonly defaultColor?: ColorName;
	readonly defaultBgColor?: BgColorName;
	readonly style?: StyleModifier[];
}

export interface ColorState {
	readonly currentColor: ColorName;
	readonly currentBgColor: BgColorName;
	readonly currentStyle: readonly StyleModifier[];
}
