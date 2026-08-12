/**
 * Adapters layer - Progress handler - Pure Functional Implementation
 * Entry point for progress operations using pure domain functions
 */

import { applyColorFormatting } from "#modules/color/domain/operations";
import type { ColorName } from "#modules/color/types";
import {
	createProgressState,
	formatProgress,
	renderProgressBar,
} from "#modules/progress/domain/operations";
import type {
	ProgressBarOptions,
	ProgressState,
} from "#modules/progress/types";

/**
 * Progress adapter state type (no state needed for this adapter)
 */
type ProgressAdapterState = {
	readonly tag: "ProgressAdapter";
};

/**
 * Create progress adapter state
 */
export const createProgressAdapterState = (): ProgressAdapterState => ({
	tag: "ProgressAdapter",
});

/**
 * Infrastructure dependencies for progress operations
 */
export const ProgressInfrastructure = {
	/**
	 * Apply color formatting using domain logic
	 */
	applyColor(text: string, color?: ColorName): string {
		if (!color) return text;
		return applyColorFormatting(text, color);
	},

	/**
	 * Get current timestamp
	 */
	getCurrentTime(): number {
		return Date.now();
	},
} as const;

/**
 * Create a progress bar
 */
export const createProgressBar = (
	_state: ProgressAdapterState,
	current: number,
	total: number,
	options?: ProgressBarOptions,
): string => {
	const progressState = createProgressState(current, total);
	const render = renderProgressBar(progressState, options);
	return render.text;
};

/**
 * Format progress percentage
 */
export const formatProgressPercentage = (
	_state: ProgressAdapterState,
	current: number,
	total: number,
): string => formatProgress(current, total);

/**
 * Create progress state
 */
export const createProgressStateAdapter = (
	_state: ProgressAdapterState,
	current: number,
	total: number,
	_startTime?: number,
): ProgressState => createProgressState(current, total);

export const createProgressAdapter = (): ProgressAdapterState =>
	createProgressAdapterState();

/**
 * Default progress adapter instance
 */
export const progress = createProgressAdapter();
