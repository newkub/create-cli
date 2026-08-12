/**
 * Path input use case - orchestrates path input flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import {
	createPath,
	isValidPath,
	updateValue,
} from "../../domain/models/index";
import type { ITerminalPort } from "../../ports";

export const pathPrompt = async (
	message: string,
	terminal: ITerminalPort,
	options?: {
		placeholder?: string;
		directoryOnly?: boolean;
		mustExist?: boolean;
		initialValue?: string;
	},
): Promise<Result<string, Error>> => {
	let model = createPath(message, options);

	await terminal.write(`${model.message}\n`);
	await terminal.write(`> ${model.value}`);

	// Read input loop
	while (true) {
		const input = await terminal.read();

		if (input === "\r") {
			// Enter
			if (!isValidPath(model)) {
				await terminal.write("\nInvalid path\n");
				continue;
			}
			await terminal.clear();
			return { success: true, data: model.value };
		} else if (input === "\x1b") {
			// ESC
			await terminal.clear();
			return { success: false, error: new Error("Cancelled") };
		} else if (input === "\x7f") {
			// Backspace
			model = updateValue(model, model.value.slice(0, -1));
			await terminal.write(`\r> ${model.value}`);
		} else if (input.length === 1) {
			// Regular character
			model = updateValue(model, model.value + input);
			await terminal.write(`\r> ${model.value}`);
		}
	}
};
