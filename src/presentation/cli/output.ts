/**
 * Output output for intro, outro, note, and log functions
 */

import { getTerminal } from "./session";

const terminal = getTerminal();

// Intro/Outro functions
export const intro = (title?: string): void => {
	if (title) {
		terminal.write(`\x1b[1m${title}\x1b[0m\n`);
	}
};

export const outro = (message: string): void => {
	terminal.write(`\x1b[1m${message}\x1b[0m\n`);
};

// Note function
export const note = (message: string, title?: string): void => {
	if (title) {
		terminal.write(`\x1b[1m${title}\x1b[0m\n`);
	}
	terminal.write(`${message}\n`);
};

// Log functions
export const log = {
	message: (message: string, { symbol }: { symbol?: string } = {}): void => {
		terminal.write(`${symbol || "•"} ${message}\n`);
	},
	info: (message: string): void => {
		terminal.write(`\x1b[34mℹ ${message}\x1b[0m\n`);
	},
	success: (message: string): void => {
		terminal.write(`\x1b[32m✓ ${message}\x1b[0m\n`);
	},
	step: (message: string): void => {
		terminal.write(`\x1b[36m› ${message}\x1b[0m\n`);
	},
	warn: (message: string): void => {
		terminal.write(`\x1b[33m⚠ ${message}\x1b[0m\n`);
	},
	warning: (message: string): void => {
		terminal.write(`\x1b[33m⚠ ${message}\x1b[0m\n`);
	},
	error: (message: string): void => {
		terminal.write(`\x1b[31m✖ ${message}\x1b[0m\n`);
	},
};
