import { ICONS, REPORT_STATUS, TEST_STATUS } from "#reporter/shared/constants";
import { padEnd, round } from "#reporter/shared/utils";
import type {
	CoverageMetrics,
	Report,
	TestResult,
	TestStats,
	TestSuite,
} from "../../modules/reporter/types";
import type { ConsoleReporterOptions } from "./types";

export const printReport = (
	report: Report,
	options: ConsoleReporterOptions,
): void => {
	const { useColors, verbose, showCoverage, showSlowTests, slowThreshold } =
		options;

	printHeader(report.status, useColors ?? true);
	printSummary(report.stats, report.duration ?? 0, useColors ?? true);

	if (verbose || report.stats.failed > 0) {
		printFailedTests(report, useColors ?? true);
	}

	if (showSlowTests) {
		printSlowTests(report, slowThreshold ?? 1000, useColors ?? true);
	}

	if (showCoverage && report.coverage) {
		printCoverage(report.coverage, useColors ?? true);
	}

	printFooter(report.status, report.duration ?? 0, useColors ?? true);
};

const printHeader = (status: string, useColors: boolean): void => {
	const icon = getStatusIcon(status);
	const statusText = colorize(status.toUpperCase(), status, useColors);

	console.log(`\n${icon} ${statusText}`);
	console.log("─".repeat(50));
};

const printSummary = (
	stats: TestStats,
	duration: number,
	useColors: boolean,
): void => {
	console.log("📊 Test Summary:");
	console.log(`  Suites: ${stats.suites}`);
	console.log(`  Tests:  ${stats.tests}`);
	console.log(
		`  ✅ Passed: ${colorize(stats.passed.toString(), TEST_STATUS.PASSED, useColors)}`,
	);
	console.log(
		`  ❌ Failed: ${colorize(stats.failed.toString(), TEST_STATUS.FAILED, useColors)}`,
	);
	console.log(
		`  ⏭️  Skipped: ${colorize(stats.skipped.toString(), TEST_STATUS.SKIPPED, useColors)}`,
	);
	console.log(`  📝 Assertions: ${stats.assertions}`);
	console.log(`  ⏱️  Duration: ${formatDuration(duration)}`);
	console.log("");
};

const printFailedTests = (report: Report, useColors: boolean): void => {
	const failedTests = report.testSuites
		.flatMap((suite: TestSuite) => suite.testCases)
		.filter((test: TestResult) => test.status === TEST_STATUS.FAILED);

	if (failedTests.length === 0) {
		return;
	}

	console.log("❌ Failed Tests:");
	console.log("─".repeat(50));

	for (const test of failedTests) {
		console.log(
			`\n  ${colorize("✗", TEST_STATUS.FAILED, useColors)} ${test.name}`,
		);
		console.log(`    ${test.location.file}:${test.location.line ?? "?"}`);

		if (test.error) {
			console.log(
				`    ${colorize(test.error.message, TEST_STATUS.FAILED, useColors)}`,
			);

			if (test.error.stack) {
				const stackLines = test.error.stack.split("\n").slice(1, 6);
				for (const line of stackLines) {
					console.log(`    ${colorize(line, "dim", useColors)}`);
				}
			}
		}

		const failedAssertions = test.assertions.filter((a) => !a.passed);
		for (const assertion of failedAssertions) {
			console.log(
				`    ${colorize("Assertion failed:", TEST_STATUS.FAILED, useColors)}`,
			);
			if (assertion.message) {
				console.log(`      ${assertion.message}`);
			}
		}
	}
	console.log("");
};

const printSlowTests = (
	report: Report,
	threshold: number,
	useColors: boolean,
): void => {
	const slowTests = report.testSuites
		.flatMap((suite: TestSuite) => suite.testCases)
		.filter((test: TestResult) => test.duration > threshold)
		.sort((a: TestResult, b: TestResult) => b.duration - a.duration);

	if (slowTests.length === 0) {
		return;
	}

	console.log("🐌 Slow Tests:");
	console.log("─".repeat(50));

	for (const test of slowTests) {
		console.log(
			`  ${colorize(test.name, "yellow", useColors)} - ${formatDuration(test.duration)}`,
		);
	}
	console.log("");
};

const printCoverage = (coverage: CoverageMetrics, useColors: boolean): void => {
	console.log("📊 Coverage Report:");
	console.log("─".repeat(50));

	printCoverageLine("Lines", coverage.lines, useColors);
	printCoverageLine("Functions", coverage.functions, useColors);
	printCoverageLine("Branches", coverage.branches, useColors);
	printCoverageLine("Statements", coverage.statements, useColors);

	const overall =
		(coverage.lines.percentage +
			coverage.functions.percentage +
			coverage.branches.percentage +
			coverage.statements.percentage) /
		4;

	console.log(
		`\n📈 Overall: ${colorize(`${round(overall, 1)}%`, getCoverageColor(overall), useColors)}`,
	);
};

const printCoverageLine = (
	label: string,
	metric: {
		readonly percentage: number;
		readonly covered: number;
		readonly total: number;
	},
	useColors: boolean,
): void => {
	const color = getCoverageColor(metric.percentage);
	const percentage = colorize(
		`${round(metric.percentage, 1)}%`,
		color,
		useColors,
	);
	const bar = createCoverageBar(metric.percentage, useColors);

	console.log(
		`  ${padEnd(10)(label)} ${percentage} ${bar} (${metric.covered}/${metric.total})`,
	);
};

const printFooter = (
	status: string,
	duration: number,
	useColors: boolean,
): void => {
	const icon = getStatusIcon(status);
	const statusText = colorize(status.toUpperCase(), status, useColors);

	console.log(`${icon} ${statusText} in ${formatDuration(duration)}`);

	if (status === REPORT_STATUS.COMPLETED) {
		console.log("🎉 All tests passed!");
	} else if (status === REPORT_STATUS.FAILED) {
		console.log("💡 Some tests failed. Check the details above.");
	}
};

// Helper functions

const getStatusIcon = (status: string): string => {
	switch (status) {
		case REPORT_STATUS.COMPLETED:
			return ICONS.SUCCESS;
		case REPORT_STATUS.FAILED:
			return ICONS.FAILURE;
		case REPORT_STATUS.CANCELLED:
			return ICONS.WARNING;
		case REPORT_STATUS.RUNNING:
			return ICONS.TIMER;
		case REPORT_STATUS.PENDING:
			return ICONS.INFO;
		default:
			return ICONS.INFO;
	}
};

export const colorize = (
	text: string,
	status: string,
	useColors: boolean,
): string => {
	if (!useColors) return text;

	switch (status) {
		case TEST_STATUS.PASSED:
		case REPORT_STATUS.COMPLETED:
			return `\x1b[32m${text}\x1b[0m`; // Green
		case TEST_STATUS.FAILED:
		case REPORT_STATUS.FAILED:
			return `\x1b[31m${text}\x1b[0m`; // Red
		case TEST_STATUS.SKIPPED:
			return `\x1b[33m${text}\x1b[0m`; // Yellow
		case TEST_STATUS.RUNNING:
		case REPORT_STATUS.RUNNING:
			return `\x1b[34m${text}\x1b[0m`; // Blue
		case TEST_STATUS.PENDING:
		case REPORT_STATUS.PENDING:
			return `\x1b[90m${text}\x1b[0m`; // Gray
		case "dim":
			return `\x1b[2m${text}\x1b[0m`; // Dim
		case "yellow":
			return `\x1b[33m${text}\x1b[0m`; // Yellow
		default:
			return text;
	}
};

const formatDuration = (ms: number): string => {
	if (ms < 1000) {
		return `${ms.toFixed(0)}ms`;
	} else if (ms < 60000) {
		return `${(ms / 1000).toFixed(2)}s`;
	} else {
		const minutes = Math.floor(ms / 60000);
		const seconds = ((ms % 60000) / 1000).toFixed(0);
		return `${minutes}m ${seconds}s`;
	}
};

const createCoverageBar = (percentage: number, useColors: boolean): string => {
	const width = 10;
	const filled = Math.round((percentage / 100) * width);
	const empty = width - filled;

	const filledBar = colorize(
		"█".repeat(filled),
		getCoverageColor(percentage),
		useColors,
	);
	const emptyBar = "░".repeat(empty);

	return `[${filledBar}${emptyBar}]`;
};

const getCoverageColor = (percentage: number): string => {
	if (percentage >= 80) return TEST_STATUS.PASSED;
	if (percentage >= 60) return "yellow";
	return TEST_STATUS.FAILED;
};
