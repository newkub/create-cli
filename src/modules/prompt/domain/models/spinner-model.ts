/**
 * Domain model for spinner component
 * Pure readonly data structure
 */

import type { PromptState } from "../../types";

export interface SpinnerModel {
	readonly type: "spinner";
	readonly message: string;
	readonly state: PromptState;
	readonly frames: readonly string[];
	readonly currentFrame: number;
	readonly interval: number;
}

export const createSpinner = (
	message: string,
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
	interval = 80,
): SpinnerModel => ({
	type: "spinner",
	message,
	state: "idle",
	frames,
	currentFrame: 0,
	interval,
});

export const nextFrame = (model: SpinnerModel): SpinnerModel => ({
	...model,
	currentFrame: (model.currentFrame + 1) % model.frames.length,
});

export const getCurrentFrame = (model: SpinnerModel): string =>
	model.frames[model.currentFrame];
