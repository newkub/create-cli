/**
 * Group multiselect prompt use case - orchestrates grouped multiple selection flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import type { ITerminalPort } from "../../ports";

export const groupMultiselectPrompt = async <T = string>(
	options: {
		message: string;
		options: Record<string, readonly { value: T; label: string }[]>;
		initialValues?: T[];
		required?: boolean;
	},
	terminal: ITerminalPort,
): Promise<Result<T[], string>> => {
	const groups = Object.entries(options.options);
	const selectedValues = new Set(options.initialValues || []);

	let groupIndex = 0;
	let optionIndex = 0;

	// Write prompt message
	await terminal.write(`${options.message}\n`);

	// Display grouped options
	const displayOptions = async () => {
		for (let g = 0; g < groups.length; g++) {
			const [groupName, groupOptions] = groups[g];
			await terminal.write(`\x1b[1m${groupName}\x1b[0m\n`);

			for (let o = 0; o < groupOptions.length; o++) {
				const opt = groupOptions[o];
				const isCurrent = g === groupIndex && o === optionIndex;
				const prefix = isCurrent ? "› " : "  ";
				const selected = selectedValues.has(opt.value) ? "✓ " : "  ";
				await terminal.write(`${prefix}${selected}${opt.label}\n`);
			}
		}
	};

	await displayOptions();

	// Read selection
	const input = await terminal.read();

	// Handle navigation
	if (input === "\x1b[A") {
		// Up arrow
		if (optionIndex > 0) {
			optionIndex--;
		} else if (groupIndex > 0) {
			groupIndex--;
			optionIndex = groups[groupIndex][1].length - 1;
		}
	} else if (input === "\x1b[B") {
		// Down arrow
		const currentGroupOptions = groups[groupIndex][1];
		if (optionIndex < currentGroupOptions.length - 1) {
			optionIndex++;
		} else if (groupIndex < groups.length - 1) {
			groupIndex++;
			optionIndex = 0;
		}
	} else if (input === " ") {
		// Space - toggle selection
		const currentOpt = groups[groupIndex][1][optionIndex];
		if (selectedValues.has(currentOpt.value)) {
			selectedValues.delete(currentOpt.value);
		} else {
			selectedValues.add(currentOpt.value);
		}
	} else if (input === "\r") {
		// Enter - submit
		if (options.required && selectedValues.size === 0) {
			await terminal.write("\nAt least one option must be selected\n");
			return { success: false, error: "Required selection" };
		}
		await terminal.clear();
		return { success: true, data: Array.from(selectedValues) };
	}

	await terminal.clear();
	return { success: false, error: "Cancelled" };
};
