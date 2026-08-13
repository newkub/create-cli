export const padStart =
	(length: number, fillString: string = " ") =>
	(str: string): string => {
		return str.padStart(length, fillString);
	};

export const padEnd =
	(length: number, fillString: string = " ") =>
	(str: string): string => {
		return str.padEnd(length, fillString);
	};

export const truncate = (
	str: string,
	maxLength: number,
	suffix: string = "...",
): string => {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength - suffix.length) + suffix;
};
