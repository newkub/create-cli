/**
 * Domain type definitions for prompt components
 */

export type PromptType =
	| "text"
	| "password"
	| "confirm"
	| "select"
	| "multiselect"
	| "autocomplete"
	| "date"
	| "path";

export type PromptState = "idle" | "active" | "submit" | "cancel";

export type PromptTheme = "light" | "dark" | "auto";

export interface PromptOptions {
	message: string;
	defaultValue?: string;
	validate?: (value: string) => string | undefined;
	mask?: string;
	placeholder?: string;
}

export interface SelectOption<T = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface SelectOptions<T = string> extends PromptOptions {
	options: readonly SelectOption<T>[];
	initialValue?: T;
}

export interface ConfirmOptions extends PromptOptions {
	initialValue?: boolean;
}

export interface PromptContext {
	readonly type: PromptType;
	readonly state: PromptState;
	readonly theme: PromptTheme;
}

export interface PromptConfig {
	theme?: PromptTheme;
}

export interface PromptResult<T = unknown> {
	success: boolean;
	data?: T;
	error?: Error;
}
