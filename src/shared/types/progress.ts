import type { ColorStyle } from "./color";

export type ProgressBarOptions = {
	readonly width?: number;
	readonly character?: string;
	readonly incompleteCharacter?: string;
	readonly style?: ColorStyle;
};

export const createProgressBarOptions = (
	width?: number,
	character?: string,
	incompleteCharacter?: string,
	style?: ColorStyle,
): ProgressBarOptions => ({ width, character, incompleteCharacter, style });

export type ProgressState = {
	readonly current: number;
	readonly total: number;
	readonly percentage: number;
	readonly isComplete: boolean;
};

export const createProgressState = (
	current: number,
	total: number,
	percentage: number,
	isComplete: boolean,
): ProgressState => ({ current, total, percentage, isComplete });

export type ProgressRender = {
	readonly text: string;
	readonly state: ProgressState;
};

export const createProgressRender = (
	text: string,
	state: ProgressState,
): ProgressRender => ({
	text,
	state,
});

export type MultiProgressBar = {
	readonly segments: readonly {
		id: string;
		current: number;
		total: number;
		text?: string;
	}[];
};

export const createMultiProgressBar = (
	segments: readonly {
		id: string;
		current: number;
		total: number;
		text?: string;
	}[],
): MultiProgressBar => ({ segments });
