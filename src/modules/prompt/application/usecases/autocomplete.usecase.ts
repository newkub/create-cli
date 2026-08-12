/**
 * Autocomplete use case - orchestrates autocomplete flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import {
	createAutocomplete,
	filterByQuery,
	getSelectedValue,
	selectNext,
	selectPrev,
	updateQuery,
} from "../../domain/models/index";
import type { ITerminalPort } from "../../ports";
import type { SelectOptions } from "../../types";

export const autocompletePrompt = async <T = string>(
	options: SelectOptions<T>,
	terminal: ITerminalPort,
): Promise<Result<T, string>> => {
	let model = createAutocomplete(options.message, options.options);

	await terminal.write(`${model.message}\n`);

	// Display initial options
	await displayOptions(model, terminal);

	// Read input loop
	while (true) {
		const input = await terminal.read();

		if (input === "\r") {
			// Enter
			const value = getSelectedValue(model);
			if (value) {
				await terminal.clear();
				return { success: true, data: value };
			}
			return { success: false, error: "No selection" };
		} else if (input === "\x1b") {
			// ESC
			await terminal.clear();
			return { success: false, error: "Cancelled" };
		} else if (input === "\x1b[A") {
			// Up arrow
			model = selectPrev(model);
			await displayOptions(model, terminal);
		} else if (input === "\x1b[B") {
			// Down arrow
			model = selectNext(model);
			await displayOptions(model, terminal);
		} else if (input === "\x7f") {
			// Backspace
			model = updateQuery(model, model.query.slice(0, -1));
			model = filterByQuery(model);
			await displayOptions(model, terminal);
		} else if (input.length === 1) {
			// Regular character
			model = updateQuery(model, model.query + input);
			model = filterByQuery(model);
			await displayOptions(model, terminal);
		}
	}
};

async function displayOptions<T>(
	model: import("../../domain/models").AutocompleteModel<T>,
	terminal: ITerminalPort,
): Promise<void> {
	await terminal.write(`\r\x1b[K${model.query}\n`);

	for (let i = 0; i < model.filteredOptions.length; i++) {
		const opt = model.filteredOptions[i];
		const prefix = i === model.selectedIndex ? "› " : "  ";
		await terminal.write(`${prefix}${opt.label}\n`);
	}
}
