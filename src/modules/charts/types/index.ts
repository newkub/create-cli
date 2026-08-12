/**
 * Charts module types
 */

import type { ColorStyle } from "#shared/types";

export type ChartType = "bar" | "line" | "pie";

export interface ChartData {
	readonly label: string;
	readonly value: number;
	readonly color?: string;
}

export interface ChartOptions {
	readonly width?: number;
	readonly height?: number;
	readonly style?: ColorStyle;
	readonly showLabels?: boolean;
	readonly showValues?: boolean;
	readonly maxValue?: number;
}

export interface ChartRender {
	readonly lines: readonly string[];
	readonly size: { readonly width: number; readonly height: number };
}
