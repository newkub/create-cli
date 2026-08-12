import type { ColorStyle } from "./index";

export type Position = {
	readonly x: number;
	readonly y: number;
};

export const createPosition = (x: number, y: number): Position => ({ x, y });

export type Size = {
	readonly width: number;
	readonly height: number;
};

export const createSize = (width: number, height: number): Size => ({
	width,
	height,
});

export type BoxStyle = {
	readonly border?: boolean;
	readonly padding?: number;
	readonly margin?: number;
	readonly style?: ColorStyle;
};

export const createBoxStyle = (
	border?: boolean,
	padding?: number,
	margin?: number,
	style?: ColorStyle,
): BoxStyle => ({ border, padding, margin, style });
