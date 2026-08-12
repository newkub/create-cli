/**
 * Flex Component Domain Operations
 * Pure functions for flexbox-like layout
 */

export interface FlexProps {
	flexDirection?: "row" | "column";
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around";
	alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
	gap?: number;
	padding?: number;
}

export const renderFlex = (props: FlexProps, children?: string): string => {
	const { flexDirection = "row", gap = 0, padding = 0 } = props;

	const content = children || "";
	const paddingSpace = " ".repeat(padding);

	if (flexDirection === "row") {
		const items = content.split(" ").filter(Boolean);
		const gapSpace = " ".repeat(gap);
		const joined = items.join(gapSpace);
		const padded = paddingSpace + joined + paddingSpace;

		return padded;
	}

	// Column layout
	const lines = content.split("\n");
	const gapLines = Array(gap).fill("");
	const paddedLines = lines.map((line) => paddingSpace + line + paddingSpace);
	const finalLines = paddedLines.flatMap((line, i) =>
		i < paddedLines.length - 1 ? [line, ...gapLines] : [line],
	);

	return finalLines.join("\n");
};
