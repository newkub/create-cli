/**
 * Date picker use case - orchestrates date selection flow
 * Uses ports for side effects, pure logic in domain
 */

import type { Result } from "#shared/types";
import type { DateModel } from "../../domain/models/index";
import {
	createDate,
	getDate,
	isValidDate,
	updateDay,
	updateMonth,
} from "../../domain/models/index";
import type { ITerminalPort } from "../../ports";

export const datePrompt = async (
	message: string,
	options: { initialDate?: Date; minDate?: Date; maxDate?: Date },
	terminal: ITerminalPort,
): Promise<Result<Date, string>> => {
	let model = createDate(
		message,
		options.initialDate,
		options.minDate,
		options.maxDate,
	);

	await terminal.write(`${model.message}\n`);
	await displayDate(model, terminal);

	// Read input loop
	while (true) {
		const input = await terminal.read();

		if (input === "\r") {
			// Enter
			if (!isValidDate(model)) {
				await terminal.write("\nInvalid date\n");
				continue;
			}
			const date = getDate(model);
			await terminal.clear();
			return { success: true, data: date };
		} else if (input === "\x1b") {
			// ESC
			await terminal.clear();
			return { success: false, error: "Cancelled" };
		} else if (input === "\x1b[A") {
			// Up arrow - increment day
			model = updateDay(model, model.day + 1);
			await displayDate(model, terminal);
		} else if (input === "\x1b[B") {
			// Down arrow - decrement day
			model = updateDay(model, model.day - 1);
			await displayDate(model, terminal);
		} else if (input === "\x1b[C") {
			// Right arrow - increment month
			model = updateMonth(model, model.month + 1);
			await displayDate(model, terminal);
		} else if (input === "\x1b[D") {
			// Left arrow - decrement month
			model = updateMonth(model, model.month - 1);
			await displayDate(model, terminal);
		}
	}
};

async function displayDate(
	model: DateModel,
	terminal: ITerminalPort,
): Promise<void> {
	const dateStr = `${model.year}-${String(model.month).padStart(2, "0")}-${String(model.day).padStart(2, "0")}`;
	await terminal.write(`\r\x1b[KDate: ${dateStr}`);
	await terminal.write(
		" (Use arrows to navigate, Enter to select, ESC to cancel)",
	);
}
