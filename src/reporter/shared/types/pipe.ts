/**
 * Pipe function for composition (local, not in @wrikka/shared)
 */

export const pipe = <T>(value: T) => ({
	pipe: <U>(fn: (value: T) => U): U => fn(value),
});
