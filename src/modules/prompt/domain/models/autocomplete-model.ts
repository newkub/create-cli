/**
 * Domain model for autocomplete component
 * Pure readonly data structure
 */

import type { PromptState, SelectOption } from "../../types";

export interface AutocompleteModel<T = string> {
	readonly type: "autocomplete";
	readonly message: string;
	readonly state: PromptState;
	readonly options: readonly SelectOption<T>[];
	readonly filteredOptions: readonly SelectOption<T>[];
	readonly query: string;
	readonly selectedIndex: number;
}

export const createAutocomplete = <T = string>(
	message: string,
	options: readonly SelectOption<T>[],
): AutocompleteModel<T> => ({
	type: "autocomplete",
	message,
	state: "idle",
	options,
	filteredOptions: options,
	query: "",
	selectedIndex: 0,
});

export const updateQuery = <T>(
	model: AutocompleteModel<T>,
	query: string,
): AutocompleteModel<T> => ({
	...model,
	query,
	selectedIndex: 0,
});

export const filterByQuery = <T>(
	model: AutocompleteModel<T>,
): AutocompleteModel<T> => {
	const lowerQuery = model.query.toLowerCase();
	const filtered = model.options.filter((opt) =>
		opt.label.toLowerCase().includes(lowerQuery),
	);
	return {
		...model,
		filteredOptions: filtered,
		selectedIndex: Math.min(
			model.selectedIndex,
			Math.max(0, filtered.length - 1),
		),
	};
};

export const selectNext = <T>(
	model: AutocompleteModel<T>,
): AutocompleteModel<T> => {
	const maxIndex = model.filteredOptions.length - 1;
	const nextIndex =
		model.selectedIndex >= maxIndex ? 0 : model.selectedIndex + 1;
	return { ...model, selectedIndex: nextIndex };
};

export const selectPrev = <T>(
	model: AutocompleteModel<T>,
): AutocompleteModel<T> => {
	const maxIndex = model.filteredOptions.length - 1;
	const prevIndex =
		model.selectedIndex <= 0 ? maxIndex : model.selectedIndex - 1;
	return { ...model, selectedIndex: prevIndex };
};

export const getSelectedValue = <T>(
	model: AutocompleteModel<T>,
): T | undefined => {
	const selected = model.filteredOptions[model.selectedIndex];
	return selected?.value;
};
