/**
 * Box component for TUI
 */

export interface BoxProps {
	width?: number;
	height?: number;
	border?: boolean;
	padding?: number;
	margin?: number;
	children?: string;
}

export const renderBox = (props: BoxProps): string => {
	const { width = 0, height = 0, border = false, children = "" } = props;
	const horizontal = "─".repeat(width);
	const vertical = "│".repeat(height);
	const corners = "┌┐└┘";

	if (border) {
		return `
${corners[0]}${horizontal}${corners[1]}
${vertical}${" ".repeat(width)}${vertical}
${children}
${vertical}${" ".repeat(width)}${vertical}
${corners[2]}${horizontal}${corners[3]}
`;
	}

	return children;
};
