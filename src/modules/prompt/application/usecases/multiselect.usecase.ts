/**
 * Multiselect prompt use case - orchestrates multiple selection flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import { createSelectPrompt } from "../../domain/models/index";
import type { ITerminalPort } from "../../ports";
import type { SelectOptions } from "../../types";

export const multiselectPrompt = async <T = string>(
	options: SelectOptions<T> & {
		required?: boolean;
		initialValues?: T[];
	},
	terminal: ITerminalPort,
): Promise<Result<T[], string>> => {
	const model = createSelectPrompt(options);
	const enabledOptions = model.options.filter((opt) => !opt.disabled);
	const selectedIndices = new Set<number>(
		options.initialValues
			?.map((val) => model.options.findIndex((opt) => opt.value === val))
			.filter((i) => i >= 0) || [],
	);

	if (enabledOptions.length === 0) {
		return { success: false, error: "No options available" };
	}

	let selectedIndex = 0;

	// Write prompt message
	await terminal.write(`${model.message}\n`);

	// Display options with selection markers
	const displayOptions = async () => {
		for (let i = 0; i < model.options.length; i++) {
			const opt = model.options[i];
			const prefix = i === selectedIndex ? "› " : "  ";
			const selected = selectedIndices.has(i) ? "✓ " : "  ";
			const label = opt.disabled ? `${opt.label} (disabled)` : opt.label;
			await terminal.write(`${prefix}${selected}${label}\n`);
		}
	};

	await displayOptions();

	// Read selection
	const input = await terminal.read();

	// Handle navigation
	if (input === "\x1b[A") {
		// Up arrow
		selectedIndex = Math.max(0, selectedIndex - 1);
	} else if (input === "\x1b[B") {
		// Down arrow
		selectedIndex = Math.min(model.options.length - 1, selectedIndex + 1);
	} else if (input === " ") {
		// Space - toggle selection
		if (!model.options[selectedIndex].disabled) {
			if (selectedIndices.has(selectedIndex)) {
				selectedIndices.delete(selectedIndex);
			} else {
				selectedIndices.add(selectedIndex);
			}
		}
	} else if (input === "\r") {
		// Enter - submit
		if (options.required && selectedIndices.size === 0) {
			await terminal.write("\nAt least one option must be selected\n");
			return { success: false, error: "Required selection" };
		}
		const selected = Array.from(selectedIndices).map(
			(i) => enabledOptions[i].value,
		);
		await terminal.clear();
		return { success: true, data: selected };
	}

	await terminal.clear();
	return { success: false, error: "Cancelled" };
};
