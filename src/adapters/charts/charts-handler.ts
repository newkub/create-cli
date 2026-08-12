/**
 * Adapters layer - Charts handler
 * Entry point for charts operations using pure domain functions
 */

import {
	renderBarChart,
	renderChart,
	renderPieChart,
	validateChartData,
	validateChartOptions,
} from "#modules/charts/domain/operations";
import type { ChartData, ChartOptions } from "#modules/charts/types";
import { applyColorFormatting } from "#modules/color/domain/operations";
import type { ColorName } from "#modules/color/types";

/**
 * Infrastructure dependencies for charts operations
 */
export const ChartsInfrastructure = {
	/**
	 * Apply color formatting using domain logic
	 */
	applyColor(text: string, color?: ColorName): string {
		if (!color) return text;
		return applyColorFormatting(text, color);
	},

	/**
	 * Format numbers with locale support
	 */
	formatNumber(value: number): string {
		return value.toLocaleString();
	},
} as const;

/**
 * Charts adapter - handles external interface with direct domain calls
 */

/**
 * Create a bar chart - Functional implementation
 */
export const createBarChart = (
	data: ChartData[],
	options?: ChartOptions,
): string => {
	const render = renderBarChart(data, options);
	return render.lines.join("\n");
};

/**
 * Create a pie chart - Functional implementation
 */
export const createPieChart = (
	data: ChartData[],
	options?: ChartOptions,
): string => {
	const render = renderPieChart(data, options);
	return render.lines.join("\n");
};

/**
 * Create a generic chart - Functional implementation
 */
export const createChart = (
	type: "bar" | "pie" | "line",
	data: ChartData[],
	options?: ChartOptions,
): string => {
	const render = renderChart(type, data, options);
	return render.lines.join("\n");
};

/**
 * Validate chart data - Functional implementation
 */
export const validateData = (data: ChartData[]): boolean => {
	return validateChartData(data);
};

/**
 * Validate chart options - Functional implementation
 */
export const validateOptions = (options: ChartOptions): boolean => {
	return validateChartOptions(options);
};

/**
 * Factory function to create charts adapter
 */
export function createChartsAdapter() {
	return {
		createBarChart,
		createPieChart,
		createChart,
		validateData,
		validateOptions,
	};
}

/**
 * Default charts adapter instance
 */
export const charts = createChartsAdapter();
