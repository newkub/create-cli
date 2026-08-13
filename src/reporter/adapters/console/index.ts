/**
 * Console adapter for reporting test results
 */

// Re-export printer utilities
export { colorize } from "./printers";
// Re-export reporter
export {
	createConsoleReporter,
	createConsoleReporter as default,
} from "./reporter";
// Re-export types
export type { ConsoleReporterOptions } from "./types";
