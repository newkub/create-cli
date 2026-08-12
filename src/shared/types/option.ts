/**
 * Option type for handling nullable values - represents some or none
 * Pure functional alternative to null/undefined
 */

export type Option<T> = Some<T> | None;

export type Some<T> = { type: "some"; value: T };
export type None = { type: "none" };

export const some = <T>(value: T): Option<T> => ({ type: "some", value });
export const none: Option<never> = { type: "none" };

export const isSome = <T>(option: Option<T>): option is Some<T> =>
	option.type === "some";

export const isNone = <T>(option: Option<T>): option is None =>
	option.type === "none";

export const map = <T, U>(
	option: Option<T>,
	fn: (value: T) => U,
): Option<U> => {
	if (isSome(option)) {
		return some(fn(option.value));
	}
	return none;
};

export const unwrap = <T>(option: Option<T>, defaultValue: T): T => {
	if (isSome(option)) {
		return option.value;
	}
	return defaultValue;
};

export const unwrapOrThrow = <T>(option: Option<T>, message?: string): T => {
	if (isSome(option)) {
		return option.value;
	}
	throw new Error(message ?? "Attempted to unwrap None");
};
