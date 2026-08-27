/**
 * Powerline-style status bars with patched font symbols
 * Creates stylish status bars with segmented sections using powerline separators
 */

export interface PowerlineSegment {
	/** Text content of the segment */
	text: string;
	/** Background color (ANSI code or truecolor) */
	bgColor?: string;
	/** Foreground color (ANSI code or truecolor) */
	fgColor?: string;
	/** Icon/symbol to show before text */
	icon?: string;
}

export type PowerlineStyle = "rounded" | "sharp" | "slant" | "flat";

const RESET = "\x1b[0m";

// Powerline separator characters (require patched font)
const separators: Record<PowerlineStyle, { left: string; right: string }> = {
	rounded: { left: "\ue0b6", right: "\ue0b4" },
	sharp: { left: "\ue0b0", right: "\ue0b2" },
	slant: { left: "\ue0bd", right: "\ue0be" },
	flat: { left: "", right: "" },
};

/**
 * Create a powerline segment with proper formatting
 */
export const createPowerlineSegment = (
	text: string,
	options: {
		bgColor?: string;
		fgColor?: string;
		icon?: string;
	},
): PowerlineSegment => ({
	text,
	bgColor: options.bgColor,
	fgColor: options.fgColor,
	icon: options.icon,
});

/**
 * Render a powerline status bar from segments
 */
export const renderPowerline = (
	segments: PowerlineSegment[],
	style: PowerlineStyle = "sharp",
): string => {
	if (segments.length === 0) return "";

	const sep = separators[style];
	let result = "";

	for (let i = 0; i < segments.length; i++) {
		const seg = segments[i]!;
		const nextSeg = segments[i + 1];
		const prevSeg = segments[i - 1];

		const fg = seg.fgColor ?? "\x1b[37m";
		const bg = seg.bgColor ?? "\x1b[40m";
		const nextBg = nextSeg?.bgColor ?? "\x1b[49m"; // default bg
		const prevBg = prevSeg?.bgColor ?? "\x1b[49m";

		// Render separator from previous segment's bg to current segment's bg
		if (i > 0 && sep.left) {
			result += `${prevBg}${fg}${sep.left}`;
		}

		// Render segment content
		const iconStr = seg.icon ? `${seg.icon} ` : "";
		result += `${bg}${fg} ${iconStr}${seg.text} `;

		// If last segment, render closing separator
		if (i === segments.length - 1 && sep.left) {
			result += `${nextBg}${fg}${sep.left}`;
		}
	}

	result += RESET;
	return result;
};

// Preset color schemes for powerline segments
export const powerlineColors = {
	blue: { bg: "\x1b[44m", fg: "\x1b[37m" },
	green: { bg: "\x1b[42m", fg: "\x1b[30m" },
	yellow: { bg: "\x1b[43m", fg: "\x1b[30m" },
	red: { bg: "\x1b[41m", fg: "\x1b[37m" },
	cyan: { bg: "\x1b[46m", fg: "\x1b[30m" },
	magenta: { bg: "\x1b[45m", fg: "\x1b[37m" },
	gray: { bg: "\x1b[100m", fg: "\x1b[37m" },
	darkGray: { bg: "\x1b[90m", fg: "\x1b[37m" },
};

// Truecolor versions
export const powerlineTrueColors = {
	dracula: {
		purple: { bg: "\x1b[48;2;189;147;249m", fg: "\x1b[38;2;40;42;54m" },
		cyan: { bg: "\x1b[48;2;139;233;253m", fg: "\x1b[38;2;40;42;54m" },
		green: { bg: "\x1b[48;2;80;250;123m", fg: "\x1b[38;2;40;42;54m" },
		red: { bg: "\x1b[48;2;255;85;85m", fg: "\x1b[38;2;40;42;54m" },
		yellow: { bg: "\x1b[48;2;241;250;140m", fg: "\x1b[38;2;40;42;54m" },
	},
	solarized: {
		blue: { bg: "\x1b[48;2;38;139;210m", fg: "\x1b[38;2;253;246;227m" },
		green: { bg: "\x1b[48;2;133;153;0m", fg: "\x1b[38;2;253;246;227m" },
		red: { bg: "\x1b[48;2;220;50;47m", fg: "\x1b[38;2;253;246;227m" },
		yellow: { bg: "\x1b[48;2;181;137;0m", fg: "\x1b[38;2;253;246;227m" },
		cyan: { bg: "\x1b[48;2;42;161;152m", fg: "\x1b[38;2;253;246;227m" },
	},
};

// Common powerline icons (require Nerd Font / patched font)
export const powerlineIcons = {
	git: "\ue0a0",
	branch: "\ue0a0",
	folder: "\uf07c",
	file: "\uf15b",
	home: "\uf015",
	user: "\uf007",
	cog: "\uf013",
	terminal: "\uf120",
	linux: "\uf17c",
	apple: "\uf179",
	windows: "\uf17a",
	clock: "\uf017",
	battery: "\uf240",
	wifi: "\uf1eb",
	lock: "\uf023",
	check: "\uf00c",
	cross: "\uf00d",
	warning: "\uf071",
	info: "\uf05a",
};
