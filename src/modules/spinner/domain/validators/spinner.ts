/**
 * Spinner validation functions
 */

import { MIN_INTERVAL_MS } from "#shared/constants/spinner";
import type { SpinnerOptions } from "#shared/types";

export function validateSpinnerOptions(options: SpinnerOptions): string[] {
	const errors: string[] = [];

	// Note: frames are handled internally by spinner implementation
	// No frame validation needed at this level

	if (options.interval && options.interval < MIN_INTERVAL_MS) {
		errors.push(`Spinner interval must be at least ${MIN_INTERVAL_MS}ms`);
	}

	return errors;
}
