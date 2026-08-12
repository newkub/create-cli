import type { ColorStyle } from "./color";

export type SpinnerType =
	| "dots"
	| "line"
	| "pipe"
	| "bounce"
	| "arrow"
	| "clock";

export type SpinnerOptions = {
	readonly type?: SpinnerType;
	readonly interval?: number;
	readonly style?: ColorStyle;
	readonly text?: string;
};

export const createSpinnerOptions = (
	type?: SpinnerType,
	interval?: number,
	style?: ColorStyle,
	text?: string,
): SpinnerOptions => ({ type, interval, style, text });

export type SpinnerState = {
	readonly frame: number;
	readonly text: string;
	readonly isRunning: boolean;
};

export const createSpinnerState = (
	frame: number,
	text: string,
	isRunning: boolean,
): SpinnerState => ({ frame, text, isRunning });
