/**
 * Text prompt use case - orchestrates text input flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import { createTextPrompt } from "../../domain/models/index";
import { validateRequired } from "../../domain/operations/index";
import type { ITerminalPort } from "../../ports";
import type { PromptOptions } from "../../types";

export const textPrompt = async (
	options: PromptOptions,
	terminal: ITerminalPort,
): Promise<Result<string>> => {
	const model = createTextPrompt(options);

	// Write prompt message
	await terminal.write(`${model.message} `);

	// Read input
	const input = await terminal.read();

	// Use default value if input is empty
	const value = input || options.defaultValue || "";

	// Validate - use custom validate if provided, otherwise required check
	if (options.validate) {
		const customError = options.validate(value);
		if (customError) {
			await terminal.write(`\n${customError}\n`);
			return { success: false, error: new Error(customError) };
		}
	} else {
		const validation = validateRequired(value);
		if (!validation.success) {
			await terminal.write(`\n${validation.error}\n`);
			return validation;
		}
	}

	// Clear line
	await terminal.write("\r");
	await terminal.clear();

	return { success: true, data: value };
};
