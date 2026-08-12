/**
 * Progress bar use case - orchestrates progress display
 * Uses ports for side effects, pure logic in domain
 */

import {
	createProgress,
	getProgressBar,
	updateProgress,
} from "../../domain/models/index";
import type { ITerminalPort } from "../../ports";

export const progress = async (
	message: string,
	total: number,
	onUpdate: (update: (current: number) => void) => Promise<void>,
	terminal: ITerminalPort,
): Promise<void> => {
	let model = createProgress(message, total);

	await terminal.hideCursor();

	const update = (current: number) => {
		model = updateProgress(model, current);
		const bar = getProgressBar(model);
		terminal.write(`\r${model.message} ${bar}`);
	};

	await onUpdate(update);

	await terminal.showCursor();
	await terminal.write("\n");
};
