/**
 * Domain model for date picker component
 * Pure readonly data structure
 */

import type { PromptState } from "../../types";

export interface DateModel {
	readonly type: "date";
	readonly message: string;
	readonly state: PromptState;
	readonly year: number;
	readonly month: number;
	readonly day: number;
	readonly minDate?: Date;
	readonly maxDate?: Date;
}

export const createDate = (
	message: string,
	initialDate?: Date,
	minDate?: Date,
	maxDate?: Date,
): DateModel => {
	const date = initialDate ?? new Date();
	return {
		type: "date",
		message,
		state: "idle",
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		minDate,
		maxDate,
	};
};

export const updateYear = (model: DateModel, year: number): DateModel => ({
	...model,
	year,
});

export const updateMonth = (model: DateModel, month: number): DateModel => ({
	...model,
	month: Math.max(1, Math.min(12, month)),
});

export const updateDay = (model: DateModel, day: number): DateModel => {
	const daysInMonth = getDaysInMonth(model.year, model.month);
	return {
		...model,
		day: Math.max(1, Math.min(daysInMonth, day)),
	};
};

export const getDate = (model: DateModel): Date => {
	return new Date(model.year, model.month - 1, model.day);
};

export const isValidDate = (model: DateModel): boolean => {
	const date = getDate(model);

	if (model.minDate && date < model.minDate) return false;
	if (model.maxDate && date > model.maxDate) return false;

	return true;
};

const getDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month, 0).getDate();
};
