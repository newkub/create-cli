/**
 * Progress domain operations - Pure functions for progress rendering
 */

import type {
	ProgressBarOptions,
	ProgressRender,
	ProgressState,
} from "#modules/progress/types";
import { clamp, repeat } from "#shared/utils";

export const createProgressState = (
	current: number,
	total: number,
): ProgressState => ({
	current: clamp(current, 0, total),
	total,
	percentage: Math.round((clamp(current, 0, total) / total) * 100),
});

export const renderProgressBar = (
	state: ProgressState,
	options: ProgressBarOptions = {},
): ProgressRender => {
	const {
		width = 40,
		character = "█",
		incompleteCharacter = "░",
		showPercentage = true,
		showValue = false,
	} = options;

	const filledWidth = Math.round((state.percentage / 100) * width);
	const emptyWidth = width - filledWidth;

	const bar =
		repeat(character, filledWidth) + repeat(incompleteCharacter, emptyWidth);

	let text = bar;

	if (showPercentage) {
		text += ` ${state.percentage}%`;
	}

	if (showValue) {
		text += ` (${state.current}/${state.total})`;
	}

	return {
		text,
		state,
	};
};

export const renderSpinner = (
	state: ProgressState,
	frames: readonly string[] = [
		"⠋",
		"⠙",
		"⠹",
		"⠸",
		"⠼",
		"⠴",
		"⠦",
		"⠧",
		"⠇",
		"⠏",
	],
): ProgressRender => {
	const frameIndex =
		Math.floor((state.current / state.total) * frames.length) % frames.length;
	const frame = frames[frameIndex];

	const text = `${frame} ${state.percentage}%`;

	return {
		text,
		state,
	};
};

export const formatProgress = (
	current: number,
	total: number,
	options: ProgressBarOptions = {},
): string =>
	renderProgressBar(createProgressState(current, total), options).text;

export const validateProgressOptions = (
	options: ProgressBarOptions,
): boolean => {
	const { width, character, incompleteCharacter } = options;

	if (width !== undefined && width <= 0) return false;
	if (character !== undefined && character.length !== 1) return false;
	if (incompleteCharacter !== undefined && incompleteCharacter.length !== 1)
		return false;

	return true;
};
