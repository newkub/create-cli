export const REPORT_STATUS = {
	PENDING: "pending" as const,
	RUNNING: "running" as const,
	COMPLETED: "completed" as const,
	FAILED: "failed" as const,
	CANCELLED: "cancelled" as const,
} as const;

export const REPORT_STATUS_VALUES = [
	REPORT_STATUS.PENDING,
	REPORT_STATUS.RUNNING,
	REPORT_STATUS.COMPLETED,
	REPORT_STATUS.FAILED,
	REPORT_STATUS.CANCELLED,
] as const;

export type ReportStatus = (typeof REPORT_STATUS_VALUES)[number];

export const TEST_STATUS = {
	PASSED: "passed" as const,
	FAILED: "failed" as const,
	SKIPPED: "skipped" as const,
	PENDING: "pending" as const,
	RUNNING: "running" as const,
} as const;

export const TEST_STATUS_VALUES = [
	TEST_STATUS.PASSED,
	TEST_STATUS.FAILED,
	TEST_STATUS.SKIPPED,
	TEST_STATUS.PENDING,
	TEST_STATUS.RUNNING,
] as const;

export type TestStatus = (typeof TEST_STATUS_VALUES)[number];

// Icons for console reporting
export const ICONS = {
	SUCCESS: "✓",
	FAILURE: "✗",
	WARNING: "⚠",
	TIMER: "⏱",
	INFO: "ℹ",
} as const;

export const OUTPUT_FORMATS = {
	CONSOLE: "console" as const,
	JSON: "json" as const,
	HTML: "html" as const,
	JUNIT: "junit" as const,
	MARKDOWN: "markdown" as const,
} as const;

export const OUTPUT_FORMAT_VALUES = [
	OUTPUT_FORMATS.CONSOLE,
	OUTPUT_FORMATS.JSON,
	OUTPUT_FORMATS.HTML,
	OUTPUT_FORMATS.JUNIT,
	OUTPUT_FORMATS.MARKDOWN,
] as const;

export type OutputFormat = (typeof OUTPUT_FORMAT_VALUES)[number];

export const DEFAULT_TIMEOUT = 30000;
export const DEFAULT_SLOW_THRESHOLD = 1000;
export const MIN_TIMEOUT = 100;
export const MAX_TIMEOUT = 300000;
