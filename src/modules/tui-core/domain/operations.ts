/**
 * TUI Core Domain Operations
 * Pure functions for component rendering and state management
 */

import type {
	ComponentChildren,
	ComponentProps,
	RenderContext,
	RenderOutput,
} from "./types";

// Pure render function - no side effects
export const renderComponent = (
	_props: ComponentProps,
	children?: ComponentChildren,
	_context?: RenderContext,
): RenderOutput => {
	const content = (children as string) || "";

	return {
		content,
		width: content.length,
		height: 1,
	};
};

// Pure layout calculation
export const calculateLayout = (
	components: readonly RenderOutput[],
	direction: "row" | "column",
): RenderOutput => {
	if (direction === "row") {
		const totalWidth = components.reduce((sum, c) => sum + c.width, 0);
		const maxHeight = Math.max(...components.map((c) => c.height));
		const content = components.map((c) => c.content).join(" ");

		return {
			content,
			width: totalWidth,
			height: maxHeight,
		};
	}

	// Column layout
	const totalHeight = components.reduce((sum, c) => sum + c.height, 0);
	const maxWidth = Math.max(...components.map((c) => c.width));
	const content = components.map((c) => c.content).join("\n");

	return {
		content,
		width: maxWidth,
		height: totalHeight,
	};
};

// Pure text styling
export const applyStyles = (
	text: string,
	styles: {
		bold?: boolean;
		color?: string;
		background?: string;
	},
): string => {
	let styled = text;
	const codes: number[] = [];

	if (styles.bold) codes.push(1);
	if (styles.color) codes.push(30 + (styles.color === "red" ? 1 : 0));
	if (styles.background) codes.push(40 + (styles.background === "red" ? 1 : 0));

	if (codes.length > 0) {
		styled = `\x1b[${codes.join(";")}m${text}\x1b[0m`;
	}

	return styled;
};
