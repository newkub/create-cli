/**
 * Public API for prompt components
 * Entry point for CLI applications
 * Compatible with @clack/prompts API
 */

export { group } from "./group";
// Re-export all functions from split modules
export { intro, log, note, outro } from "./output";
export type { Spinner } from "./progress";
export { showProgress, spinner, taskLog } from "./progress";
export {
	autocomplete,
	confirm,
	date,
	groupMultiselect,
	multiselect,
	password,
	path,
	select,
	selectKey,
	text,
} from "./prompt-functions";
export { cancel, isCancel } from "./session";
export { stream } from "./stream";
