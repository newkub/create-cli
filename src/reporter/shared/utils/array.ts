export const sum = (numbers: readonly number[]): number =>
	numbers.reduce((acc, n) => acc + n, 0);

export const average = (numbers: readonly number[]): number =>
	numbers.length > 0 ? sum(numbers) / numbers.length : 0;

export const max = (numbers: readonly number[]): number =>
	numbers.length > 0 ? Math.max(...numbers) : 0;

export const min = (numbers: readonly number[]): number =>
	numbers.length > 0 ? Math.min(...numbers) : 0;

export const groupBy = <T, K extends string>(
	array: readonly T[],
	keyFn: (item: T) => K,
): Record<K, readonly T[]> => {
	return array.reduce(
		(acc, item) => {
			const key = keyFn(item);
			acc[key] = [...(acc[key] ?? []), item];
			return acc;
		},
		{} as Record<K, readonly T[]>,
	);
};

export const sortBy = <T>(
	array: readonly T[],
	compareFn: (a: T, b: T) => number,
): readonly T[] => [...array].sort(compareFn);
