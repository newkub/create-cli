/**
 * Spinner constants - pure data
 */

export const DEFAULT_FRAMES = [
	"\u25cb",
	"\u25d1",
	"\u25d7",
	"\u25d9",
	"\u25ce",
	"\u25d5",
	"\u25d3",
	"\u25cf",
] as const;
export const MIN_INTERVAL_MS = 50;

// Export as SPINNER_CONSTANTS for backward compatibility
export const SPINNER_CONSTANTS = {
	DEFAULT_FRAMES,
	MIN_INTERVAL_MS,
};
