/**
 * Text Component Domain Operations
 * Pure functions for text styling
 */

export interface TextProps {
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	color?:
		| "black"
		| "red"
		| "green"
		| "yellow"
		| "blue"
		| "magenta"
		| "cyan"
		| "white";
	backgroundColor?:
		| "black"
		| "red"
		| "green"
		| "yellow"
		| "blue"
		| "magenta"
		| "cyan"
		| "white";
}

const COLORS = {
	black: 30,
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34,
	magenta: 35,
	cyan: 36,
	white: 37,
};

const BG_COLORS = {
	black: 40,
	red: 41,
	green: 42,
	yellow: 43,
	blue: 44,
	magenta: 45,
	cyan: 46,
	white: 47,
};

export const renderText = (props: TextProps, children?: string): string => {
	const content = children || "";
	const codes: number[] = [];

	if (props.bold) codes.push(1);
	if (props.italic) codes.push(3);
	if (props.underline) codes.push(4);
	if (props.color) codes.push(COLORS[props.color]);
	if (props.backgroundColor) codes.push(BG_COLORS[props.backgroundColor]);

	if (codes.length > 0) {
		return `\x1b[${codes.join(";")}m${content}\x1b[0m`;
	}

	return content;
};
