/**
 * Theme system - preset themes for terminal UI
 * Provides color palettes and styling for consistent visual appearance
 */

export interface ThemeColors {
	primary: string;
	secondary: string;
	success: string;
	warning: string;
	error: string;
	info: string;
	muted: string;
	background: string;
	foreground: string;
	selection: string;
	border: string;
}

export interface Theme {
	name: string;
	colors: ThemeColors;
	isDark: boolean;
}

export type ThemePreset =
	| "dark"
	| "light"
	| "dracula"
	| "solarized-dark"
	| "solarized-light";

// ANSI color code helpers
const ansi = (code: number): string => `\x1b[${code}m`;

// Preset themes
export const darkTheme: Theme = {
	name: "dark",
	isDark: true,
	colors: {
		primary: ansi(39), // bright blue
		secondary: ansi(35), // bright green
		success: ansi(32), // green
		warning: ansi(33), // yellow
		error: ansi(31), // red
		info: ansi(36), // cyan
		muted: ansi(90), // bright black (gray)
		background: ansi(40), // black bg
		foreground: ansi(37), // white
		selection: ansi(44), // bright blue bg
		border: ansi(90), // gray
	},
};

export const lightTheme: Theme = {
	name: "light",
	isDark: false,
	colors: {
		primary: ansi(34), // green
		secondary: ansi(34), // green
		success: ansi(32), // green
		warning: ansi(33), // yellow
		error: ansi(31), // red
		info: ansi(36), // cyan
		muted: ansi(90), // gray
		background: ansi(47), // white bg
		foreground: ansi(30), // black
		selection: ansi(46), // bright cyan bg
		border: ansi(90), // gray
	},
};

export const draculaTheme: Theme = {
	name: "dracula",
	isDark: true,
	colors: {
		primary: "\x1b[38;2;189;147;249m", // purple
		secondary: "\x1b[38;2;139;233;253m", // cyan
		success: "\x1b[38;2;80;250;123m", // green
		warning: "\x1b[38;2;241;250;140m", // yellow
		error: "\x1b[38;2;255;85;85m", // red
		info: "\x1b[38;2;139;233;253m", // cyan
		muted: "\x1b[38;2;98;114;164m", // comment gray
		background: "\x1b[48;2;40;42;54m", // dark bg
		foreground: "\x1b[38;2;248;248;242m", // foreground
		selection: "\x1b[48;2;68;71;90m", // current line
		border: "\x1b[38;2;98;114;164m", // comment
	},
};

export const solarizedDarkTheme: Theme = {
	name: "solarized-dark",
	isDark: true,
	colors: {
		primary: "\x1b[38;2;38;139;210m", // blue
		secondary: "\x1b[38;2;108;113;196m", // violet
		success: "\x1b[38;2;133;153;0m", // green
		warning: "\x1b[38;2;181;137;0m", // yellow
		error: "\x1b[38;2;220;50;47m", // red
		info: "\x1b[38;2;42;161;152m", // cyan
		muted: "\x1b[38;2;101;123;131m", // base01
		background: "\x1b[48;2;0;43;54m", // base03
		foreground: "\x1b[38;2;131;148;150m", // base0
		selection: "\x1b[48;2;7;54;66m", // base02
		border: "\x1b[38;2;88;110;117m", // base01
	},
};

export const solarizedLightTheme: Theme = {
	name: "solarized-light",
	isDark: false,
	colors: {
		primary: "\x1b[38;2;38;139;210m", // blue
		secondary: "\x1b[38;2;108;113;196m", // violet
		success: "\x1b[38;2;133;153;0m", // green
		warning: "\x1b[38;2;181;137;0m", // yellow
		error: "\x1b[38;2;220;50;47m", // red
		info: "\x1b[38;2;42;161;152m", // cyan
		muted: "\x1b[38;2;101;123;131m", // base01
		background: "\x1b[48;2;253;246;227m", // base3
		foreground: "\x1b[38;2;101;123;131m", // base00
		selection: "\x1b[48;2;238;232;213m", // base2
		border: "\x1b[38;2;88;110;117m", // base01
	},
};

export const themePresets: Record<ThemePreset, Theme> = {
	dark: darkTheme,
	light: lightTheme,
	dracula: draculaTheme,
	"solarized-dark": solarizedDarkTheme,
	"solarized-light": solarizedLightTheme,
};

// Current theme state
let currentTheme: Theme = darkTheme;

export const getTheme = (): Theme => currentTheme;

export const setTheme = (preset: ThemePreset | Theme): void => {
	if (typeof preset === "string") {
		currentTheme = themePresets[preset] ?? darkTheme;
	} else {
		currentTheme = preset;
	}
};

export const resetTheme = (): void => {
	currentTheme = darkTheme;
};

/**
 * Create a custom theme
 */
export const createTheme = (
	name: string,
	colors: Partial<ThemeColors>,
	isDark = true,
): Theme => {
	return {
		name,
		isDark,
		colors: { ...darkTheme.colors, ...colors },
	};
};

/**
 * Apply theme to text - wraps text with theme color codes
 */
export const applyTheme = (
	text: string,
	colorKey: keyof ThemeColors,
	theme?: Theme,
): string => {
	const t = theme ?? currentTheme;
	const color = t.colors[colorKey];
	if (!color) return text;
	return `${color}${text}\x1b[0m`;
};
