/**
 * Progress validation functions
 */

import {
	MAX_LABEL_LENGTH,
	MAX_PROGRESS_WIDTH,
	MAX_SEGMENTS,
	MIN_PROGRESS_WIDTH,
} from "#shared/constants/progress";
import type { MultiProgressBar, ProgressBarOptions } from "#shared/types";

export function validateProgressOptions(options: ProgressBarOptions): string[] {
	const errors: string[] = [];

	if (options.width !== undefined && options.width < MIN_PROGRESS_WIDTH) {
		errors.push(`Progress bar width must be at least ${MIN_PROGRESS_WIDTH}`);
	}

	if (options.width !== undefined && options.width > MAX_PROGRESS_WIDTH) {
		errors.push(`Progress bar width cannot exceed ${MAX_PROGRESS_WIDTH}`);
	}

	if (options.character && options.character.length !== 1) {
		errors.push("Character must be exactly 1 character");
	}

	if (options.incompleteCharacter && options.incompleteCharacter.length !== 1) {
		errors.push("Incomplete character must be exactly 1 character");
	}

	return errors;
}

export function validateMultiProgressData(data: MultiProgressBar): string[] {
	const errors: string[] = [];

	if (!data.segments || data.segments.length === 0) {
		errors.push("Multi-progress must have at least one segment");
	}

	if (data.segments.length > MAX_SEGMENTS) {
		errors.push(
			`Multi-progress cannot have more than ${MAX_SEGMENTS} segments`,
		);
	}

	for (const segment of data.segments) {
		if (segment.current < 0) {
			errors.push(`Segment current value cannot be negative: ${segment.id}`);
		}
		if (segment.total <= 0) {
			errors.push(`Segment total must be positive: ${segment.id}`);
		}
		if (segment.current > segment.total) {
			errors.push(`Segment current cannot exceed total: ${segment.id}`);
		}
		if (segment.text && segment.text.length > MAX_LABEL_LENGTH) {
			errors.push(`Segment text too long: ${segment.id}`);
		}
	}

	return errors;
}
