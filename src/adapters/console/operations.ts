/**
 * Console infrastructure - Side effect implementations
 * Clean Architecture 2 - Infrastructure layer
 */

import { promises as fs } from "node:fs";

/**
 * Exit process with code
 */
export const exitProcess = (code: number): void => {
	process.exit(code);
};

/**
 * Create directory recursively
 */
export const createDirectory = async (path: string): Promise<void> => {
	await fs.mkdir(path, { recursive: true });
};
