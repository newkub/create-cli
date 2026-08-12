import type { TerminalUiError } from "./error-types";

export const toTerminalUiException = (error: TerminalUiError): Error => {
	const exception = new Error(error.message);
	exception.name = error._tag;
	return exception;
};
