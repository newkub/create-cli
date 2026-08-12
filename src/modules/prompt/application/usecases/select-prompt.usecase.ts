/**
 * Select prompt use case - orchestrates selection flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import { createSelectPrompt } from "../../domain/models/index";
import {
	findNextEnabledOption,
	findPrevEnabledOption,
} from "../../domain/operations/index";
import type { ITerminalPort } from "../../ports";
import type { SelectOptions } from "../../types";

export const selectPrompt = async <T = string>(
	options: SelectOptions<T>,
	terminal: ITerminalPort,
): Promise<Result<T, string>> => {
	const model = createSelectPrompt(options);
	const enabledOptions = model.options.filter((opt) => !opt.disabled);

	if (enabledOptions.length === 0) {
		return { success: false, error: "No options available" };
	}

	let selectedIndex = 0;

	// Write prompt message
	await terminal.write(`${model.message}\n`);

	// Display options
	for (let i = 0; i < model.options.length; i++) {
		const opt = model.options[i];
		const prefix = i === selectedIndex ? "› " : "  ";
		const label = opt.disabled ? `${opt.label} (disabled)` : opt.label;
		await terminal.write(`${prefix}${label}\n`);
	}

	// Read selection
	const input = await terminal.read();

	// Handle navigation
	if (input === "\x1b[A") {
		// Up arrow
		const nextOption = findPrevEnabledOption(model.options, selectedIndex);
		if (nextOption) {
			selectedIndex = model.options.indexOf(nextOption);
		}
	} else if (input === "\x1b[B") {
		// Down arrow
		const nextOption = findNextEnabledOption(model.options, selectedIndex);
		if (nextOption) {
			selectedIndex = model.options.indexOf(nextOption);
		}
	} else if (input === "\r") {
		// Enter
		const selected = enabledOptions[selectedIndex];
		await terminal.clear();
		return { success: true, data: selected.value };
	}

	await terminal.clear();
	return { success: false, error: "Cancelled" };
};
