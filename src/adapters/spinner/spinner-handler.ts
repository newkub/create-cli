/**
 * Adapters layer - Spinner handler - Pure Functional Implementation
 * Entry point for spinner operations using pure domain functions
 */

import { clearLine, writeToStdout } from "#adapters/terminal";
import { startTimer, stopTimer } from "#adapters/timer";
import {
	advanceSpinner,
	createSpinnerState,
	renderSpinner,
	startSpinner,
	stopSpinner,
} from "#modules/spinner/domain/operations";
import type { SpinnerOptions, SpinnerState } from "#modules/spinner/types";

/**
 * Spinner adapter state type
 */
type SpinnerAdapterState = {
	readonly registry: Map<string, SpinnerState>;
};

/**
 * Create spinner adapter state
 */
export const createSpinnerAdapterState = (): SpinnerAdapterState => ({
	registry: new Map(),
});

/**
 * Infrastructure dependencies for spinner operations
 */
export const SpinnerInfrastructure = {
	startTimer,
	stopTimer,
	writeToStdout,
	clearLine,
} as const;

/**
 * Get spinner from adapter state
 */
export const getSpinner = (
	state: SpinnerAdapterState,
	id: string,
): SpinnerState | undefined => state.registry.get(id);

/**
 * Set spinner in adapter state
 */
export const setSpinner = (
	state: SpinnerAdapterState,
	id: string,
	spinnerState: SpinnerState,
): SpinnerAdapterState => {
	const newRegistry = new Map(state.registry);
	newRegistry.set(id, spinnerState);
	return { registry: newRegistry };
};

/**
 * Delete spinner from adapter state
 */
export const deleteSpinner = (
	state: SpinnerAdapterState,
	id: string,
): SpinnerAdapterState => {
	const newRegistry = new Map(state.registry);
	newRegistry.delete(id);
	return { registry: newRegistry };
};

/**
 * Check if spinner exists in adapter state
 */
export const hasSpinner = (state: SpinnerAdapterState, id: string): boolean =>
	state.registry.has(id);

/**
 * Create and start a spinner
 */
export const createSpinner = (
	state: SpinnerAdapterState,
	id: string,
	options?: SpinnerOptions,
): SpinnerAdapterState => {
	const initialState = createSpinnerState(0, options?.text || "", false);
	const runningState = startSpinner(initialState, options?.text);
	return setSpinner(state, id, runningState);
};

/**
 * Advance spinner frame
 */
export const advance = (
	state: SpinnerAdapterState,
	id: string,
): SpinnerAdapterState => {
	const currentSpinner = getSpinner(state, id);
	if (currentSpinner) {
		const newState = advanceSpinner(currentSpinner);
		const updatedState = setSpinner(state, id, newState);
		const render = renderSpinner(newState, {});
		SpinnerInfrastructure.writeToStdout(`\r${render.text}`);
		return updatedState;
	}
	return state;
};

/**
 * Stop a spinner
 */
export const stop = (
	state: SpinnerAdapterState,
	id: string,
	finalText?: string,
): SpinnerAdapterState => {
	const currentSpinner = getSpinner(state, id);
	if (currentSpinner) {
		stopSpinner(currentSpinner, finalText);
		if (finalText) {
			SpinnerInfrastructure.writeToStdout(`\r${finalText}\n`);
		}
		return deleteSpinner(state, id);
	}
	return state;
};

export const createSpinnerAdapter = () => ({});

/**
 * Default spinner adapter instance
 */
export const spinner = createSpinnerAdapter();
