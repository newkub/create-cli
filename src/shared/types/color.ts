export type ColorCode = string;
export type StyleModifier =
	| "bold"
	| "dim"
	| "italic"
	| "underline"
	| "inverse"
	| "hidden"
	| "strikethrough";

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

export type BgColorName = ColorName;
export type ModifierName = StyleModifier;

export type ColorStyle = {
	readonly color?: ColorCode;
	readonly backgroundColor?: ColorCode;
	readonly modifiers?: readonly StyleModifier[];
};

export const createColorStyle = (
	color?: ColorCode,
	backgroundColor?: ColorCode,
	modifiers?: readonly StyleModifier[],
): ColorStyle => ({ color, backgroundColor, modifiers });
