/**
 * Prompt adapter - Connects pure validators to infrastructure
 * Clean Architecture 2 - Input adapter
 */

import {
	validateCancel,
	validateDirectoryRequirement,
} from "#shared/utils/prompts";

/**
 * Handle cancellation with side effect
 */
export const handleCancel = <T>(value: T | symbol): T => {
	const result = validateCancel(value);
	if (result.isCancelled) {
		process.exit(0);
	}
	return result.value;
};

/**
 * Ensure directory exists with side effect
 */
export const ensureDirectoryExists = (path: string): void => {
	const requirement = validateDirectoryRequirement(path);
	if (requirement.needsCreation) {
		try {
			const { mkdirSync } = require("node:fs");
			mkdirSync(requirement.directory, { recursive: true });
		} catch (error) {
			console.error(
				`Failed to create directory: ${requirement.directory}`,
				error,
			);
		}
	}
};
