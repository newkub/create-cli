/**
 * Pure selection operations for select/multiselect components
 * No side effects, no dependencies
 */

import type { SelectOption } from "../../types";

export const findOptionByValue = <T>(
	options: readonly SelectOption<T>[],
	value: T,
): SelectOption<T> | undefined => {
	return options.find((opt) => opt.value === value);
};

export const findNextEnabledOption = <T>(
	options: readonly SelectOption<T>[],
	currentIndex: number,
): SelectOption<T> | undefined => {
	for (let i = currentIndex + 1; i < options.length; i++) {
		if (!options[i].disabled) {
			return options[i];
		}
	}
	return undefined;
};

export const findPrevEnabledOption = <T>(
	options: readonly SelectOption<T>[],
	currentIndex: number,
): SelectOption<T> | undefined => {
	for (let i = currentIndex - 1; i >= 0; i--) {
		if (!options[i].disabled) {
			return options[i];
		}
	}
	return undefined;
};

export const toggleSelection = <T>(
	selected: readonly T[],
	value: T,
	allowMultiple: boolean,
): readonly T[] => {
	if (allowMultiple) {
		return selected.includes(value)
			? selected.filter((v) => v !== value)
			: [...selected, value];
	}
	return [value];
};

export const filterOptions = <T>(
	options: readonly SelectOption<T>[],
	query: string,
): readonly SelectOption<T>[] => {
	const lowerQuery = query.toLowerCase();
	return options.filter((opt) => opt.label.toLowerCase().includes(lowerQuery));
};

export const getEnabledOptions = <T>(
	options: readonly SelectOption<T>[],
): readonly SelectOption<T>[] => {
	return options.filter((opt) => !opt.disabled);
};
