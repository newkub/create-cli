/**
 * Text component for TUI
 */

export interface TextProps {
	content: string;
	color?: string;
	bold?: boolean;
	italic?: boolean;
}

export const renderText = (props: TextProps): string => {
	const { content, color, bold = false, italic = false } = props;
	let result = content;

	if (bold) result = `\x1b[1m${result}\x1b[0m`;
	if (italic) result = `\x1b[3m${result}\x1b[0m`;
	if (color) result = `\x1b[${color}m${result}\x1b[0m`;

	return result;
};
