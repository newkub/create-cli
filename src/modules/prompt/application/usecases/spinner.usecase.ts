/**
 * Spinner use case - orchestrates spinner animation
 * Uses ports for side effects, pure logic in domain
 */

import {
	createSpinner,
	getCurrentFrame,
	nextFrame,
} from "../../domain/models/index";
import type { ITerminalPort } from "../../ports";

export const spinner = async (
	message: string,
	terminal: ITerminalPort,
): Promise<void> => {
	const model = createSpinner(message);

	await terminal.hideCursor();

	const intervalId = setInterval(async () => {
		const updatedModel = nextFrame(model);
		const frame = getCurrentFrame(updatedModel);
		await terminal.write(`\r${frame} ${model.message}`);
	}, model.interval);

	return new Promise((resolve) => {
		// Resolve after timeout - cancellation is handled by the caller clearing the interval
		setTimeout(() => {
			clearInterval(intervalId);
			terminal.showCursor();
			terminal.write("\n");
			resolve();
		}, 3000);
	});
};
