export const COLORS = {
	RESET: "\x1b[0m",
	BRIGHT: "\x1b[1m",
	DIM: "\x1b[2m",
	RED: "\x1b[31m",
	GREEN: "\x1b[32m",
	YELLOW: "\x1b[33m",
	BLUE: "\x1b[34m",
	MAGENTA: "\x1b[35m",
	CYAN: "\x1b[36m",
	WHITE: "\x1b[37m",
} as const;

export const ICONS = {
	SUCCESS: "✅",
	FAILURE: "❌",
	SKIPPED: "⏭️",
	RUNNING: "🏃",
	PENDING: "⏳",
	WARNING: "⚠️",
	INFO: "ℹ️",
	TIMER: "⏱️",
	CHART: "📊",
	ROCKET: "🚀",
	STAR: "⭐",
} as const;
