/**
 * Prompt functions for user input
 */

import {
	autocompletePrompt,
	datePrompt,
	groupMultiselectPrompt,
	multiselectPrompt,
	pathPrompt,
	selectKeyPrompt,
	selectPrompt,
	textPrompt,
} from "../../modules/prompt/application/usecases";
import type { PromptOptions, SelectOptions } from "../../modules/prompt/types";
import { getSessionCancelled, getTerminal } from "./session";

const terminal = getTerminal();

export const text = async (options: PromptOptions): Promise<string> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await textPrompt(options, terminal);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};

export const select = async <T = string>(
	options: SelectOptions<T>,
): Promise<T> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await selectPrompt(options, terminal);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};

export const password = async (options: PromptOptions): Promise<string> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	return text(options);
};

export const confirm = async (options: {
	message: string;
	initialValue?: boolean;
}): Promise<boolean> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await selectPrompt(
		{
			message: options.message,
			options: [
				{ value: "true", label: "Yes" },
				{ value: "false", label: "No" },
			],
			initialValue: options.initialValue ? "true" : "false",
		},
		terminal,
	);
	if (!result.success) {
		throw result.error;
	}
	return result.data === "true";
};

export const autocomplete = async <T = string>(
	options: SelectOptions<T>,
): Promise<T> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await autocompletePrompt(options, terminal);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};

export const date = async (options: {
	message: string;
	initialDate?: Date;
	minDate?: Date;
	maxDate?: Date;
}): Promise<Date> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await datePrompt(options.message, options, terminal);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};

export const path = async (options: {
	message: string;
	placeholder?: string;
	directoryOnly?: boolean;
	mustExist?: boolean;
	initialValue?: string;
}): Promise<string> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await pathPrompt(options.message, terminal, options);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};

export const multiselect = async <T = string>(
	options: SelectOptions<T> & {
		required?: boolean;
		initialValues?: T[];
	},
): Promise<T[]> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await multiselectPrompt(options, terminal);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};

export const groupMultiselect = async <T = string>(options: {
	message: string;
	options: Record<string, readonly { value: T; label: string }[]>;
	initialValues?: T[];
	required?: boolean;
}): Promise<T[]> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await groupMultiselectPrompt(options, terminal);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};

export const selectKey = async <T = string>(
	options: SelectOptions<T>,
): Promise<T> => {
	if (getSessionCancelled()) {
		return Symbol.for("cancel") as never;
	}
	const result = await selectKeyPrompt(options, terminal);
	if (!result.success) {
		throw result.error;
	}
	return result.data;
};
