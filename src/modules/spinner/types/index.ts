/**
 * Spinner module types
 */

import type { ColorStyle } from "#shared/types";

export type SpinnerType =
	| "dots"
	| "line"
	| "pipe"
	| "bounce"
	| "arrow"
	| "clock";

export interface SpinnerOptions {
	readonly type?: SpinnerType;
	readonly interval?: number;
	readonly style?: ColorStyle;
	readonly text?: string;
}

export interface SpinnerState {
	readonly frame: number;
	readonly text: string;
	readonly isRunning: boolean;
}

export interface SpinnerRender {
	readonly text: string;
	readonly state: SpinnerState;
}
