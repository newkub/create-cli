/**
 * Timer infrastructure - Side effect implementations
 * Clean Architecture 2 - Infrastructure layer
 */

/**
 * Start timer using Node.js/Bun timer APIs
 */
export const startTimer = (
	callback: () => void,
	interval: number,
): ReturnType<typeof setInterval> => {
	if (typeof setInterval !== "undefined") {
		return setInterval(callback, interval);
	}
	// Fallback for environments without setInterval
	return setTimeout(callback, interval);
};

/**
 * Stop timer using Node.js/Bun timer APIs
 */
export const stopTimer = (timerId: ReturnType<typeof setInterval>): void => {
	if (typeof clearInterval !== "undefined" && timerId) {
		clearInterval(timerId);
	} else if (typeof clearTimeout !== "undefined" && timerId) {
		clearTimeout(timerId);
	}
};
