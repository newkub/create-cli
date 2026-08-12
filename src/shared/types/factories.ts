/**
 * Factory functions for creating type instances
 */

import type {
	BoxStyle,
	ColorCode,
	ColorStyle,
	MultiProgressBar,
	Position,
	ProgressBarOptions,
	ProgressRender,
	ProgressState,
	Size,
	SpinnerOptions,
	SpinnerState,
	StyleModifier,
} from "./index";

export const createColorStyle = (
	color?: ColorCode,
	backgroundColor?: ColorCode,
	modifiers?: readonly StyleModifier[],
): ColorStyle => ({ color, backgroundColor, modifiers });

export const createPosition = (x: number, y: number): Position => ({ x, y });

export const createSize = (width: number, height: number): Size => ({
	width,
	height,
});

export const createBoxStyle = (
	border?: boolean,
	padding?: number,
	margin?: number,
	style?: ColorStyle,
): BoxStyle => ({ border, padding, margin, style });

export const createSpinnerOptions = (
	type?: "dots" | "line" | "pipe" | "bounce" | "arrow" | "clock",
	interval?: number,
	style?: ColorStyle,
	text?: string,
): SpinnerOptions => ({ type, interval, style, text });

export const createSpinnerState = (
	frame: number,
	text: string,
	isRunning: boolean,
): SpinnerState => ({ frame, text, isRunning });

export const createProgressBarOptions = (
	width?: number,
	character?: string,
	incompleteCharacter?: string,
	style?: ColorStyle,
): ProgressBarOptions => ({ width, character, incompleteCharacter, style });

export const createProgressState = (
	current: number,
	total: number,
	percentage: number,
	isComplete: boolean,
): ProgressState => ({ current, total, percentage, isComplete });

export const createProgressRender = (
	text: string,
	state: ProgressState,
): ProgressRender => ({
	text,
	state,
});

export const createMultiProgressBar = (
	segments: readonly {
		id: string;
		current: number;
		total: number;
		text?: string;
	}[],
): MultiProgressBar => ({ segments });
