/**
 * Progress and spinner progress
 */

import { progress } from "../../modules/prompt/application/usecases";
import { getTerminal } from "./session";

const terminal = getTerminal();

export type Spinner = {
	start: (msg: string) => void;
	stop: (msg?: string) => void;
};

export const spinner = (): Spinner => {
	let stopped = false;

	return {
		start: (msg: string) => {
			if (stopped) return;
			terminal.write(`\x1b[36m⠋ ${msg}\x1b[0m`);
		},
		stop: (msg?: string) => {
			stopped = true;
			if (msg) {
				terminal.write(`\r\x1b[2K\x1b[32m✓ ${msg}\x1b[0m\n`);
			}
		},
	};
};

export const showProgress = async (
	message: string,
	total: number,
	onUpdate: (update: (current: number) => void) => Promise<void>,
): Promise<void> => {
	await progress(message, total, onUpdate, terminal);
};

export const taskLog = async (
	message: string,
	task: () => Promise<void>,
): Promise<void> => {
	terminal.write(`\x1b[36m› ${message}\x1b[0m`);
	await task();
	terminal.write(`\r\x1b[2K\x1b[32m✓ ${message}\x1b[0m\n`);
};
