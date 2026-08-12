/**
 * Select key prompt use case - orchestrates key-based selection flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import { createSelectPrompt } from "../../domain/models/index";
import type { ITerminalPort } from "../../ports";
import type { SelectOption, SelectOptions } from "../../types";

export const selectKeyPrompt = async <T = string>(
	options: SelectOptions<T>,
	terminal: ITerminalPort,
): Promise<Result<T, string>> => {
	const model = createSelectPrompt(options);
	const enabledOptions = model.options.filter(
		(opt: SelectOption<T>) => !opt.disabled,
	);

	if (enabledOptions.length === 0) {
		return { success: false, error: "No options available" };
	}

	// Write prompt message
	await terminal.write(`${model.message}\n`);

	// Display options with key hints
	for (const opt of model.options) {
		const label = opt.disabled ? `${opt.label} (disabled)` : opt.label;
		await terminal.write(`  ${label}\n`);
	}

	// Read key input
	const input = await terminal.read();

	// Find matching option
	const selected = enabledOptions.find((opt) => {
		const key = String(opt.value)[0].toLowerCase();
		return input.toLowerCase() === key;
	});

	if (selected) {
		await terminal.clear();
		return { success: true, data: selected.value };
	}

	await terminal.clear();
	return { success: false, error: "Cancelled" };
};
