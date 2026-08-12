/**
 * Shared errors - Pure functional error types with discriminated unions
 */

// Re-export constructors
export {
	createAppError,
	createNotFoundError,
	createValidationError,
} from "./constructors";
// Re-export converter
export { toTerminalUiException } from "./converter";
// Re-export types
// Export TerminalError as alias for TerminalUiError for backward compatibility
export type {
	AppError,
	NotFoundError,
	TerminalUiError,
	TerminalUiError as TerminalError,
	ValidationError,
} from "./error-types";
// Re-export type guards
export {
	isAppError,
	isNotFoundError,
	isTerminalUiError,
	isValidationError,
} from "./guards";
