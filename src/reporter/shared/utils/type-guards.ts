export const identity = <T>(x: T): T => x;

export const always =
	<T>(x: T): (() => T) =>
	() =>
		x;

export const tap =
	<T>(fn: (x: T) => void): ((x: T) => T) =>
	(x) => {
		fn(x);
		return x;
	};

export const memoize = <T extends readonly unknown[], R>(
	fn: (...args: T) => R,
): ((...args: T) => R) => {
	const cache = new Map<string, R>();

	return (...args: T): R => {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			const cached = cache.get(key);
			if (cached !== undefined) {
				return cached;
			}
		}

		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
};

export const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const isNotNil = <T>(value: T | null | undefined): value is T =>
	value != null;

export const isString = (value: unknown): value is string =>
	typeof value === "string";

export const isNumber = (value: unknown): value is number =>
	typeof value === "number" && !Number.isNaN(value);

export const isBoolean = (value: unknown): value is boolean =>
	typeof value === "boolean";

export const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null && !Array.isArray(value);

export const isArray = <T = unknown>(value: unknown): value is T[] =>
	Array.isArray(value);
