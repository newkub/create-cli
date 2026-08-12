/**
 * Prompts validators - Pure functions for prompt validation
 * Clean Architecture 2 - Application layer validators
 */

/**
 * Symbol used by clack to indicate cancellation
 */
const CANCEL_SYMBOL = Symbol.for("clack:cancel");

/**
 * Check if a value is a cancellation symbol from clack prompts
 */
export const isCancel = <T>(value: T | symbol): value is symbol => {
	return typeof value === "symbol" && value === CANCEL_SYMBOL;
};

/**
 * Validate cancellation and return result instead of side effect
 */
export const validateCancel = <T>(
	value: T | symbol,
): { readonly isCancelled: boolean; readonly value: T } => {
	if (isCancel(value)) {
		return { isCancelled: true, value: null as T };
	}
	return { isCancelled: false, value: value as T };
};

/**
 * Extract directory path from file path
 */
export const extractDirectory = (path: string): string => {
	const lastSlash = path.lastIndexOf("/");
	const lastBackslash = path.lastIndexOf("\\");
	const separatorIndex = Math.max(lastSlash, lastBackslash);

	return separatorIndex === -1 ? "" : path.slice(0, separatorIndex);
};

/**
 * Create a prompt configuration
 */
export const createPrompt = (options: {
	readonly message: string;
	readonly defaultValue?: string;
	readonly validate?: (value: string) => boolean | string;
}) => options;

/**
 * Validate directory existence requirement
 */
export const validateDirectoryRequirement = (
	path: string,
): { readonly needsCreation: boolean; readonly directory: string } => {
	const directory = extractDirectory(path);
	return {
		needsCreation: directory.length > 0,
		directory,
	};
};
