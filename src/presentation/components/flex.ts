/**
 * Flex component for TUI
 */

export interface FlexProps {
	direction?: "row" | "column";
	justify?: "start" | "center" | "end";
	align?: "start" | "center" | "end";
	gap?: number;
	children?: string[];
}

export const renderFlex = (props: FlexProps): string => {
	const { direction = "row", gap = 0, children = [] } = props;

	if (direction === "row") {
		return children.join(" ".repeat(gap));
	}

	return children.join("\n".repeat(gap));
};
