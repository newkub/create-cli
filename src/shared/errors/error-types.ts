export type AppError = {
	readonly _tag: "AppError";
	readonly message: string;
	readonly code: string;
	readonly details?: unknown;
};

export type ValidationError = {
	readonly _tag: "ValidationError";
	readonly message: string;
	readonly code: "VALIDATION_ERROR";
	readonly field?: string;
	readonly details: { readonly field?: string };
};

export type NotFoundError = {
	readonly _tag: "NotFoundError";
	readonly message: string;
	readonly code: "NOT_FOUND";
	readonly resource: string;
	readonly id?: string;
	readonly details: { readonly resource: string; readonly id?: string };
};

export type TerminalUiError = AppError | ValidationError | NotFoundError;
