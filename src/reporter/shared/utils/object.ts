export const omit = <T extends Record<string, unknown>, K extends keyof T>(
	obj: T,
	keys: readonly K[],
): Omit<T, K> => {
	const result = { ...obj };
	for (const key of keys) {
		delete result[key];
	}
	return result;
};

export const pick = <T extends Record<string, unknown>, K extends keyof T>(
	obj: T,
	keys: readonly K[],
): Pick<T, K> => {
	const result = {} as Pick<T, K>;
	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key];
		}
	}
	return result;
};

export const merge = <T extends Record<string, unknown>>(
	...objects: (Partial<T> | undefined)[]
): T => {
	return objects.reduce(
		(acc, obj) => {
			if (obj && acc) {
				for (const key in obj) {
					acc[key] = obj[key];
				}
			}
			return acc;
		},
		{} as Partial<T>,
	) as T;
};
