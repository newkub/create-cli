/**
 * Error constructors (pure functions)
 */

import type { AppError, NotFoundError, ValidationError } from "./types";

export const createAppError = (
	message: string,
	code: string,
	details?: unknown,
): AppError => ({
	_tag: "AppError",
	message,
	code,
	details,
});

export const createValidationError = (
	message: string,
	field?: string,
): ValidationError => ({
	_tag: "ValidationError",
	message,
	code: "VALIDATION_ERROR",
	field,
	details: { field },
});

export const createNotFoundError = (
	resource: string,
	id?: string,
): NotFoundError => ({
	_tag: "NotFoundError",
	message: `${resource}${id ? ` with id ${id}` : ""} not found`,
	code: "NOT_FOUND",
	resource,
	id,
	details: { resource, id },
});
