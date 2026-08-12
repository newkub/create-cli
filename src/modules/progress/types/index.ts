/**
 * Progress module types
 */

import type { ColorStyle } from "#shared/types";

export type ProgressStyle = "bar" | "percentage" | "spinner";

export interface ProgressBarOptions {
	readonly width?: number;
	readonly character?: string;
	readonly incompleteCharacter?: string;
	readonly style?: ColorStyle;
	readonly showPercentage?: boolean;
	readonly showValue?: boolean;
}

export interface ProgressState {
	readonly current: number;
	readonly total: number;
	readonly percentage: number;
}

export interface ProgressRender {
	readonly text: string;
	readonly state: ProgressState;
}
