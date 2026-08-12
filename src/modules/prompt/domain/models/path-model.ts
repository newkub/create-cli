/**
 * Domain model for path input component
 * Pure readonly data structure
 */

import type { PromptState } from "../../types";

export interface PathModel {
	readonly type: "path";
	readonly message: string;
	readonly state: PromptState;
	readonly value: string;
	readonly placeholder: string;
	readonly directoryOnly: boolean;
	readonly mustExist: boolean;
}

export const createPath = (
	message: string,
	options?: {
		placeholder?: string;
		directoryOnly?: boolean;
		mustExist?: boolean;
		initialValue?: string;
	},
): PathModel => ({
	type: "path",
	message,
	state: "idle",
	value: options?.initialValue ?? "",
	placeholder: options?.placeholder ?? "Enter path",
	directoryOnly: options?.directoryOnly ?? false,
	mustExist: options?.mustExist ?? false,
});

export const updateValue = (model: PathModel, value: string): PathModel => ({
	...model,
	value,
});

export const isValidPath = (model: PathModel): boolean => {
	if (!model.value) return false;

	// Basic path validation
	if (model.directoryOnly && model.value.includes(".")) {
		// Check if it's a file extension (simple check)
		const parts = model.value.split(/[\\/]/);
		const lastPart = parts[parts.length - 1];
		if (lastPart?.includes(".")) {
			return false;
		}
	}

	return true;
};
