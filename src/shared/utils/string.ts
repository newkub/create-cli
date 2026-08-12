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
