/**
 * Validation hooks system - composable validation functions for prompts
 * Allows users to pass custom validate functions and compose multiple validators
 */

export type ValidationResult = string | undefined;

export type ValidateFunction<T = string> = (value: T) => ValidationResult;

export type AsyncValidateFunction<T = string> = (value: T) => Promise<ValidationResult>;

/**
 * Compose multiple validation functions into one.
 * Returns the first error message found, or undefined if all pass.
 */
export const composeValidationHooks = <T = string>(
	...validators: ValidateFunction<T>[]
): ValidateFunction<T> => {
	return (value: T): ValidationResult => {
		for (const validator of validators) {
			const result = validator(value);
			if (result) return result;
		}
		return undefined;
	};
};

/**
 * Compose multiple async validation functions into one.
 * Returns the first error message found, or undefined if all pass.
 */
export const composeAsyncValidationHooks = <T = string>(
	...validators: AsyncValidateFunction<T>[]
): AsyncValidateFunction<T> => {
	return async (value: T): Promise<ValidationResult> => {
		for (const validator of validators) {
			const result = await validator(value);
			if (result) return result;
		}
		return undefined;
	};
};

/**
 * Create a validation hook from a predicate function.
 * Returns the error message if the predicate returns false.
 */
export const createValidationHook = <T = string>(
	predicate: (value: T) => boolean,
	errorMessage: string,
): ValidateFunction<T> => {
	return (value: T): ValidationResult => {
		return predicate(value) ? undefined : errorMessage;
	};
};

/**
 * Create an async validation hook from an async predicate function.
 */
export const createAsyncValidationHook = <T = string>(
	predicate: (value: T) => Promise<boolean>,
	errorMessage: string,
): AsyncValidateFunction<T> => {
	return async (value: T): Promise<ValidationResult> => {
		return (await predicate(value)) ? undefined : errorMessage;
	};
};

/**
 * Run a validation hook and return a Result-style object.
 */
export const runValidation = <T = string>(
	value: T,
	validate?: ValidateFunction<T>,
): { success: boolean; error?: string } => {
	if (!validate) return { success: true };
	const error = validate(value);
	return error ? { success: false, error } : { success: true };
};

/**
 * Run an async validation hook and return a Result-style object.
 */
export const runAsyncValidation = async <T = string>(
	value: T,
	validate?: AsyncValidateFunction<T>,
): Promise<{ success: boolean; error?: string }> => {
	if (!validate) return { success: true };
	const error = await validate(value);
	return error ? { success: false, error } : { success: true };
};

/**
 * Built-in validation hooks for common use cases
 */
export const requiredHook: ValidateFunction<string> = (value) =>
	value.trim().length === 0 ? "This field is required" : undefined;

export const minLengthHook = (min: number): ValidateFunction<string> =>
	(value) => value.length < min ? `Must be at least ${min} characters` : undefined;

export const maxLengthHook = (max: number): ValidateFunction<string> =>
	(value) => value.length > max ? `Must be at most ${max} characters` : undefined;

export const patternHook = (pattern: RegExp, message: string): ValidateFunction<string> =>
	(value) => pattern.test(value) ? undefined : message;

export const emailHook: ValidateFunction<string> = (value) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : "Must be a valid email address";

export const urlHook: ValidateFunction<string> = (value) => {
	try {
		new URL(value);
		return undefined;
	} catch {
		return "Must be a valid URL";
	}
};

export const numberHook: ValidateFunction<string> = (value) =>
	Number.isNaN(Number(value)) ? "Must be a valid number" : undefined;

export const integerHook: ValidateFunction<string> = (value) => {
	const num = Number(value);
	return Number.isNaN(num) || !Number.isInteger(num) ? "Must be a valid integer" : undefined;
};

export const rangeHook = (min: number, max: number): ValidateFunction<string> =>
	(value) => {
		const num = Number(value);
		if (Number.isNaN(num)) return "Must be a valid number";
		if (num < min) return `Must be at least ${min}`;
		if (num > max) return `Must be at most ${max}`;
		return undefined;
	};
