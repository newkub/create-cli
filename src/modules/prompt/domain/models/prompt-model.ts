/**
 * Domain models for prompt components
 * Pure readonly data structures
 */

import type { PromptOptions, PromptState, SelectOption } from "../../types";

export interface TextPromptModel {
	readonly type: "text" | "password";
	readonly message: string;
	readonly defaultValue: string;
	readonly value: string;
	readonly placeholder?: string;
	readonly state: PromptState;
}

export interface SelectPromptModel<T = string> {
	readonly type: "select" | "multiselect" | "autocomplete";
	readonly message: string;
	readonly options: readonly SelectOption<T>[];
	readonly selected: readonly T[];
	readonly state: PromptState;
	readonly allowMultiple: boolean;
}

export interface ConfirmPromptModel {
	readonly type: "confirm";
	readonly message: string;
	readonly initialValue: boolean;
	readonly value: boolean;
	readonly state: PromptState;
}

export type PromptModel =
	| TextPromptModel
	| SelectPromptModel
	| ConfirmPromptModel;

export const createTextPrompt = (
	options: PromptOptions & { placeholder?: string },
): TextPromptModel => ({
	type: "text",
	message: options.message,
	defaultValue: options.defaultValue ?? "",
	value: options.defaultValue ?? "",
	placeholder: options.placeholder,
	state: "idle",
});

export const createPasswordPrompt = (
	options: PromptOptions,
): TextPromptModel => ({
	type: "password",
	message: options.message,
	defaultValue: options.defaultValue ?? "",
	value: options.defaultValue ?? "",
	state: "idle",
});

export const createSelectPrompt = <T = string>(options: {
	message: string;
	options: readonly SelectOption<T>[];
	initialValue?: T;
}): SelectPromptModel<T> => ({
	type: "select",
	message: options.message,
	options: options.options,
	selected: options.initialValue ? [options.initialValue] : [],
	state: "idle",
	allowMultiple: false,
});

export const createConfirmPrompt = (options: {
	message: string;
	initialValue?: boolean;
}): ConfirmPromptModel => ({
	type: "confirm",
	message: options.message,
	initialValue: options.initialValue ?? false,
	value: options.initialValue ?? false,
	state: "idle",
});
