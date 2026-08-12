/**
 * Gradient text colors - truecolor interpolation
 * Creates smooth color transitions across text using ANSI truecolor codes
 */

export interface GradientStop {
	/** Position 0-1 in the gradient */
	pos: number;
	/** RGB color */
	r: number;
	g: number;
	b: number;
}

const RESET = "\x1b[0m";

/**
 * Linear interpolation between two values
 */
const lerp = (a: number, b: number, t: number): number =>
	Math.round(a + (b - a) * t);

/**
 * Get interpolated color at a position in the gradient
 */
const interpolateColor = (
	stops: GradientStop[],
	pos: number,
): { r: number; g: number; b: number } => {
	if (stops.length === 0) return { r: 255, g: 255, b: 255 };
	if (stops.length === 1) return { r: stops[0]!.r, g: stops[0]!.g, b: stops[0]!.b };

	// Clamp position
	const clampedPos = Math.max(0, Math.min(1, pos));

	// Find surrounding stops
	let prev = stops[0]!;
	let next = stops[stops.length - 1]!;

	for (let i = 0; i < stops.length - 1; i++) {
		const current = stops[i]!;
		const nextStop = stops[i + 1]!;
		if (clampedPos >= current.pos && clampedPos <= nextStop.pos) {
			prev = current;
			next = nextStop;
			break;
		}
	}

	// Interpolate
	const range = next.pos - prev.pos;
	const t = range === 0 ? 0 : (clampedPos - prev.pos) / range;

	return {
		r: lerp(prev.r, next.r, t),
		g: lerp(prev.g, next.g, t),
		b: lerp(prev.b, next.b, t),
	};
};

/**
 * Create a gradient from color stops
 */
export const createGradient = (stops: GradientStop[]): {
	toAnsi: (pos: number) => string;
} => {
	return {
		toAnsi: (pos: number): string => {
			const { r, g, b } = interpolateColor(stops, pos);
			return `\x1b[38;2;${r};${g};${b}m`;
		},
	};
};

/**
 * Apply gradient coloring to a single line of text
 */
export const gradientLine = (
	text: string,
	stops: GradientStop[],
): string => {
	if (text.length === 0) return "";
	const grad = createGradient(stops);
	let result = "";

	for (let i = 0; i < text.length; i++) {
		const pos = text.length === 1 ? 0 : i / (text.length - 1);
		result += `${grad.toAnsi(pos)}${text[i]}`;
	}

	return `${result}${RESET}`;
};

/**
 * Apply gradient coloring to multi-line text
 */
export const gradientMulti = (
	text: string,
	stops: GradientStop[],
): string => {
	const lines = text.split("\n");
	const totalLines = lines.length;

	return lines
		.map((line, lineIdx) => {
			if (line.length === 0) return "";
			const linePos = totalLines === 1 ? 0 : lineIdx / (totalLines - 1);

			let result = "";
			for (let i = 0; i < line.length; i++) {
				const charPos = line.length === 1 ? linePos : linePos + (i / line.length) / totalLines;
				const { r, g, b } = interpolateColor(stops, Math.min(1, charPos));
				result += `\x1b[38;2;${r};${g};${b}m${line[i]}`;
			}
			return `${result}${RESET}`;
		})
		.join("\n");
};

/**
 * Convenience function - apply gradient to text
 * Alias for gradientLine
 */
export const gradient = (text: string, stops: GradientStop[]): string =>
	gradientLine(text, stops);

/**
 * Rainbow gradient - cycles through hue colors
 */
export const rainbow = (text: string, saturation = 100, lightness = 50): string => {
	if (text.length === 0) return "";

	let result = "";
	for (let i = 0; i < text.length; i++) {
		const hue = (i / text.length) * 360;
		const { r, g, b } = hslToRgb(hue, saturation, lightness);
		result += `\x1b[38;2;${r};${g};${b}m${text[i]}`;
	}

	return `${result}${RESET}`;
};

/**
 * HSL to RGB conversion
 */
const hslToRgb = (
	h: number,
	s: number,
	l: number,
): { r: number; g: number; b: number } => {
	const sNorm = s / 100;
	const lNorm = l / 100;
	const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = lNorm - c / 2;

	let r = 0;
	let g = 0;
	let b = 0;

	if (h < 60) { r = c; g = x; b = 0; }
	else if (h < 120) { r = x; g = c; b = 0; }
	else if (h < 180) { r = 0; g = c; b = x; }
	else if (h < 240) { r = 0; g = x; b = c; }
	else if (h < 300) { r = x; g = 0; b = c; }
	else { r = c; g = 0; b = x; }

	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
};

// Preset gradients
export const presetGradients = {
	fire: [
		{ pos: 0, r: 255, g: 0, b: 0 },
		{ pos: 0.5, r: 255, g: 128, b: 0 },
		{ pos: 1, r: 255, g: 255, b: 0 },
	] as GradientStop[],
	ocean: [
		{ pos: 0, r: 0, g: 0, b: 255 },
		{ pos: 0.5, r: 0, g: 128, b: 255 },
		{ pos: 1, r: 0, g: 255, b: 255 },
	] as GradientStop[],
	forest: [
		{ pos: 0, r: 0, g: 100, b: 0 },
		{ pos: 0.5, r: 34, g: 139, b: 34 },
		{ pos: 1, r: 144, g: 238, b: 144 },
	] as GradientStop[],
	sunset: [
		{ pos: 0, r: 255, g: 94, b: 77 },
		{ pos: 0.5, r: 255, g: 154, b: 0 },
		{ pos: 1, r: 255, g: 206, b: 84 },
	] as GradientStop[],
	purple: [
		{ pos: 0, r: 88, g: 0, b: 150 },
		{ pos: 0.5, r: 150, g: 0, b: 150 },
		{ pos: 1, r: 255, g: 0, b: 200 },
	] as GradientStop[],
};
