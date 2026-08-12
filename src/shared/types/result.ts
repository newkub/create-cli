/**
 * Result type for error handling - represents success or failure
 * Pure functional alternative to try/catch
 */

export type Result<T, E = Error> =
	| { success: true; data: T }
	| { success: false; error: E };

export const success = <T, E = Error>(data: T): Result<T, E> => ({
	success: true,
	data,
});

export const failure = <T, E = Error>(error: E): Result<T, E> => ({
	success: false,
	error,
});

export const map = <T, U, E = Error>(
	result: Result<T, E>,
	fn: (data: T) => U,
): Result<U, E> => {
	if (result.success) {
		return success(fn(result.data));
	}
	return result;
};

export const mapError = <T, E, F = Error>(
	result: Result<T, E>,
	fn: (error: E) => F,
): Result<T, F> => {
	if (!result.success) {
		return failure(fn(result.error));
	}
	return result;
};

export const chain = <T, U, E = Error>(
	result: Result<T, E>,
	fn: (data: T) => Result<U, E>,
): Result<U, E> => {
	if (result.success) {
		return fn(result.data);
	}
	return result;
};

export const unwrap = <T, E = Error>(
	result: Result<T, E>,
	defaultValue: T,
): T => {
	if (result.success) {
		return result.data;
	}
	return defaultValue;
};
