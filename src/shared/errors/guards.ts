import type {
	AppError,
	NotFoundError,
	TerminalUiError,
	ValidationError,
} from "./types";

export const isTerminalUiError = (error: unknown): error is TerminalUiError =>
	typeof error === "object" &&
	error !== null &&
	"_tag" in error &&
	["AppError", "ValidationError", "NotFoundError"].includes(
		(error as Record<string, unknown>)._tag as string,
	);

export const isAppError = (error: unknown): error is AppError =>
	isTerminalUiError(error) && error._tag === "AppError";

export const isValidationError = (error: unknown): error is ValidationError =>
	isTerminalUiError(error) && error._tag === "ValidationError";

export const isNotFoundError = (error: unknown): error is NotFoundError =>
	isTerminalUiError(error) && error._tag === "NotFoundError";
