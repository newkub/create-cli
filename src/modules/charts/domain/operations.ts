/**
 * Charts domain operations - Pure functions for chart rendering
 */

import type {
	ChartData,
	ChartOptions,
	ChartRender,
	ChartType,
} from "#modules/charts/types";

export const renderBarChart = (
	data: readonly ChartData[],
	options: ChartOptions = {},
): ChartRender => {
	const {
		width = 40,
		height = 10,
		showLabels = true,
		showValues = true,
		maxValue,
	} = options;

	const actualMaxValue = maxValue ?? Math.max(...data.map((d) => d.value));
	const lines: string[] = [];

	// Render bars from top to bottom
	for (let row = height - 1; row >= 0; row--) {
		let line = "";

		data.forEach((item, index) => {
			const barHeight = Math.round((item.value / actualMaxValue) * height);
			const shouldShowBar = row < barHeight;

			line += shouldShowBar ? "█" : " ";

			if (index < data.length - 1) {
				line += " ";
			}
		});

		lines.push(line);
	}

	// Add labels and values
	if (showLabels || showValues) {
		const labelLine = data
			.map((item) => {
				let label = "";
				if (showLabels) {
					label += item.label.slice(0, 1);
				}
				if (showValues) {
					label += `(${item.value})`;
				}
				return label.padEnd(3);
			})
			.join(" ");
		lines.push(labelLine);
	}

	return {
		lines,
		size: { width, height },
	};
};

export const renderPieChart = (
	_data: readonly ChartData[],
	options: ChartOptions = {},
): ChartRender => {
	const { width = 20, height = 10 } = options;
	const lines: string[] = [];

	// Simple pie chart using characters
	const centerRow = Math.floor(height / 2);
	const centerCol = Math.floor(width / 2);

	for (let row = 0; row < height; row++) {
		let line = "";

		for (let col = 0; col < width; col++) {
			const distance = Math.sqrt(
				(row - centerRow) ** 2 + (col - centerCol) ** 2,
			);
			const radius = Math.min(height, width) / 2 - 1;

			line += distance <= radius ? "█" : " ";
		}

		lines.push(line);
	}

	return {
		lines,
		size: { width, height },
	};
};

export const renderLineChart = (
	data: readonly ChartData[],
	options: ChartOptions = {},
): ChartRender => {
	const { width = 40, height = 10, maxValue } = options;

	const actualMaxValue = maxValue ?? Math.max(...data.map((d) => d.value));
	const minValue = Math.min(...data.map((d) => d.value));
	const range = actualMaxValue - minValue || 1;
	const lines: string[] = [];

	// Render line chart from top to bottom
	for (let row = height - 1; row >= 0; row--) {
		let line = "";

		for (let col = 0; col < width; col++) {
			const dataIndex = Math.floor((col / width) * data.length);
			const dataPoint = data[Math.min(dataIndex, data.length - 1)];
			const normalizedValue = (dataPoint.value - minValue) / range;
			const rowThreshold = Math.round(normalizedValue * (height - 1));

			if (row === rowThreshold) {
				line += "●";
			} else if (row < rowThreshold) {
				line += "│";
			} else {
				line += " ";
			}
		}

		lines.push(line);
	}

	// Add labels
	const labelLine = data.map((item) => item.label.slice(0, 3)).join(" ");
	lines.push(labelLine);

	return {
		lines,
		size: { width, height },
	};
};

export const renderChart = (
	type: ChartType,
	data: readonly ChartData[],
	options: ChartOptions = {},
): ChartRender => {
	switch (type) {
		case "bar":
			return renderBarChart(data, options);
		case "pie":
			return renderPieChart(data, options);
		case "line":
			return renderLineChart(data, options);
		default:
			throw new Error(`Unsupported chart type: ${type}`);
	}
};

export const validateChartData = (data: readonly ChartData[]): boolean => {
	return data.every(
		(item) =>
			typeof item.label === "string" &&
			typeof item.value === "number" &&
			item.value >= 0,
	);
};

export const validateChartOptions = (options: ChartOptions): boolean => {
	const { width, height, maxValue } = options;

	if (width !== undefined && width <= 0) return false;
	if (height !== undefined && height <= 0) return false;
	if (maxValue !== undefined && maxValue <= 0) return false;

	return true;
};
