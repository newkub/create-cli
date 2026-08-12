/**
 * Number prompt use case - numeric input with min/max/step validation
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import type { ITerminalPort } from "../../ports";

export interface NumberPromptOptions {
	message: string;
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	validate?: (value: number) => string | undefined;
}

const validateNumber = (
	input: string,
	options: NumberPromptOptions,
): Result<number, Error> => {
	const num = Number(input);
	if (Number.isNaN(num)) {
		return {
			success: false,
			error: new Error(`Invalid number: "${input}"`),
		};
	}

	if (options.min !== undefined && num < options.min) {
		return {
			success: false,
			error: new Error(`Value must be at least ${options.min}`),
		};
	}

	if (options.max !== undefined && num > options.max) {
		return {
			success: false,
			error: new Error(`Value must be at most ${options.max}`),
		};
	}

	if (options.step !== undefined && options.min !== undefined) {
		const offset = num - options.min;
		const remainder = offset % options.step;
		if (remainder !== 0) {
			const nearest =
				Math.round(offset / options.step) * options.step + options.min;
			return {
				success: false,
				error: new Error(`Value must be a multiple of ${options.step} from ${options.min} (nearest: ${nearest})`),
			};
		}
	}

	if (options.validate) {
		const customError = options.validate(num);
		if (customError) {
			return { success: false, error: new Error(customError) };
		}
	}

	return { success: true, data: num };
};

export const numberPrompt = async (
	options: NumberPromptOptions,
	terminal: ITerminalPort,
): Promise<Result<number, Error>> => {
	const hint = [
		options.min !== undefined ? `min: ${options.min}` : null,
		options.max !== undefined ? `max: ${options.max}` : null,
		options.step !== undefined ? `step: ${options.step}` : null,
	]
		.filter(Boolean)
		.join(", ");

	const promptMsg = hint
		? `${options.message} (${hint})`
		: options.message;

	const defaultStr =
		options.defaultValue !== undefined ? ` [${options.defaultValue}]` : "";
	await terminal.write(`${promptMsg}${defaultStr} `);

	const input = await terminal.read();

	if (!input && options.defaultValue !== undefined) {
		return { success: true, data: options.defaultValue };
	}

	const validation = validateNumber(input, options);
	if (!validation.success) {
		await terminal.write(`\n${validation.error.message}\n`);
		return validation;
	}

	await terminal.write("\r");
	await terminal.clear();

	return validation;
};
