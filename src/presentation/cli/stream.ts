/**
 * Stream stream for async message output
 */

import { getTerminal } from "./session";

const terminal = getTerminal();

// Stream functions
export const stream = {
	message: async (
		iterable: Iterable<string> | AsyncIterable<string>,
		{ symbol }: { symbol?: string } = {},
	): Promise<void> => {
		for await (const message of iterable) {
			terminal.write(`${symbol || "•"} ${message}\n`);
		}
	},
	info: async (
		iterable: Iterable<string> | AsyncIterable<string>,
	): Promise<void> => {
		for await (const message of iterable) {
			terminal.write(`\x1b[34mℹ ${message}\x1b[0m\n`);
		}
	},
	success: async (
		iterable: Iterable<string> | AsyncIterable<string>,
	): Promise<void> => {
		for await (const message of iterable) {
			terminal.write(`\x1b[32m✓ ${message}\x1b[0m\n`);
		}
	},
	step: async (
		iterable: Iterable<string> | AsyncIterable<string>,
	): Promise<void> => {
		for await (const message of iterable) {
			terminal.write(`\x1b[36m› ${message}\x1b[0m\n`);
		}
	},
	warn: async (
		iterable: Iterable<string> | AsyncIterable<string>,
	): Promise<void> => {
		for await (const message of iterable) {
			terminal.write(`\x1b[33m⚠ ${message}\x1b[0m\n`);
		}
	},
	warning: async (
		iterable: Iterable<string> | AsyncIterable<string>,
	): Promise<void> => {
		for await (const message of iterable) {
			terminal.write(`\x1b[33m⚠ ${message}\x1b[0m\n`);
		}
	},
	error: async (
		iterable: Iterable<string> | AsyncIterable<string>,
	): Promise<void> => {
		for await (const message of iterable) {
			terminal.write(`\x1b[31m✖ ${message}\x1b[0m\n`);
		}
	},
};
