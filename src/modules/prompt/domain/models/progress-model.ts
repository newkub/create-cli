/**
 * Domain model for progress bar component
 * Pure readonly data structure
 */

import type { PromptState } from "../../types";

export interface ProgressModel {
	readonly type: "progress";
	readonly message: string;
	readonly state: PromptState;
	readonly current: number;
	readonly total: number;
	readonly width: number;
}

export const createProgress = (
	message: string,
	total: number,
	width = 40,
): ProgressModel => ({
	type: "progress",
	message,
	state: "idle",
	current: 0,
	total,
	width,
});

export const updateProgress = (
	model: ProgressModel,
	current: number,
): ProgressModel => ({
	...model,
	current: Math.min(current, model.total),
});

export const getPercentage = (model: ProgressModel): number => {
	if (model.total === 0) return 0;
	return Math.round((model.current / model.total) * 100);
};

export const getProgressBar = (model: ProgressModel): string => {
	const percentage = getPercentage(model);
	const filled = Math.round((percentage / 100) * model.width);
	const empty = model.width - filled;
	return `[${"█".repeat(filled)}${"░".repeat(empty)}] ${percentage}%`;
};
