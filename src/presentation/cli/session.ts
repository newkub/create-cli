/**
 * Session and cancel handling session
 */

import { BunTerminalAdapter } from "../../adapters/terminal";

const terminal = new BunTerminalAdapter();

// Session state for cancellation handling
let isCancelled = false;

export const resetSessionState = (): void => {
	isCancelled = false;
};

export const getSessionCancelled = (): boolean => isCancelled;

// Cancel handling
export const isCancel = (value: unknown): value is symbol => {
	return value === Symbol.for("cancel");
};

export const cancel = (message?: string): void => {
	isCancelled = true;
	if (message) {
		terminal.write(`\x1b[31m✖ ${message}\x1b[0m\n`);
	}
};

export const getTerminal = () => terminal;
