/**
 * Pure utility functions
 */

export function identity<T>(value: T): T {
	return value;
}

export function compose<T, U, V>(f: (x: U) => V, g: (x: T) => U): (x: T) => V {
	return (x) => f(g(x));
}

export function pipe<T, U, V>(g: (x: T) => U, f: (x: U) => V): (x: T) => V {
	return (x) => f(g(x));
}

export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export function padLeft(
	str: string,
	length: number,
	char: string = " ",
): string {
	return str.padStart(length, char);
}

export function padRight(
	str: string,
	length: number,
	char: string = " ",
): string {
	return str.padEnd(length, char);
}

export function padCenter(
	str: string,
	length: number,
	char: string = " ",
): string {
	const padLength = length - str.length;
	if (padLength <= 0) return str;
	const leftPad = Math.floor(padLength / 2);
	const rightPad = padLength - leftPad;
	return char.repeat(leftPad) + str + char.repeat(rightPad);
}

export function repeat(str: string, count: number): string {
	return str.repeat(Math.max(0, count));
}

export function truncate(
	str: string,
	length: number,
	suffix: string = "...",
): string {
	return str.length > length
		? str.slice(0, length - suffix.length) + suffix
		: str;
}

export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}
