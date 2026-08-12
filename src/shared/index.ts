/**
 * Shared kernel - Constants, types, utils, and errors
 */

// Local shared exports
export {
	BOX_CONSTANTS,
	CHART_CONSTANTS,
	COLOR_CONSTANTS,
	PROGRESS_CONSTANTS,
	SPINNER_CONSTANTS,
	SPINNER_STATE_CONSTANTS,
} from "./constants";
export type { TerminalError } from "./errors";
export type { TerminalConfig } from "./types";
export { createPrompt, useTerminal } from "./utils";
