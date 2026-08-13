// Main exports for @wrikka/reporter

export type { ConsoleReporterOptions } from "./adapters/console";
// Console adapter
export { default as createConsoleReporter } from "./adapters/console";
// Domain operations
export {
	filterSuitesByName,
	filterSuitesByStatus,
	filterTestsByDuration,
	filterTestsByFile,
	filterTestsByPattern,
	filterTestsByStatus,
	getFailedTests,
	getPassedTests,
	getSkippedTests,
	getSlowTests,
	getTestsWithErrors,
	getTestsWithFailedAssertions,
	groupTestsByFile,
	groupTestsByStatus,
	groupTestsBySuite,
	searchTests,
} from "./modules/reporter/domain/operations/report-filtering";
// Domain types
export type {
	CoverageMetrics,
	Report,
	ReportConfig,
	ReporterOptions,
	ReportSummary,
	TestResult,
	TestStats,
	TestSuite,
} from "./modules/reporter/types";
// Shared constants
export {
	DEFAULT_SLOW_THRESHOLD,
	DEFAULT_TIMEOUT,
	ICONS,
	MAX_TIMEOUT,
	MIN_TIMEOUT,
	OUTPUT_FORMAT_VALUES,
	OUTPUT_FORMATS,
	REPORT_STATUS,
	REPORT_STATUS_VALUES,
	TEST_STATUS,
	TEST_STATUS_VALUES,
} from "./shared/constants";
// Shared errors
export {
	FormattingError,
	OutputError,
	ReportingError,
	ValidationError,
} from "./shared/errors";
// Shared types
export type { Either, Option, Result } from "./shared/types";
export { failure, left, none, right, some, success } from "./shared/types";

// Shared utilities - replaced with @wrikka/utils
