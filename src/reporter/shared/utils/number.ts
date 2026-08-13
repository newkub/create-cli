export const round = (num: number, precision: number = 0): number => {
	const factor = 10 ** precision;
	return Math.round(num * factor) / factor;
};

export const clamp = (num: number, min: number, max: number): number => {
	return Math.min(Math.max(num, min), max);
};
