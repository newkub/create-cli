import type { TestStatus } from "#reporter/shared/constants";
import { TEST_STATUS } from "#reporter/shared/constants";
import { ValidationError } from "#reporter/shared/errors";
import { failure, type Result, success } from "#reporter/shared/types";
import type { Report, TestResult, TestSuite } from "../../types";

// Pure functions for report filtering operations

export const filterTestsByStatus = (
	report: Report,
	status: TestStatus,
): Result<readonly TestResult[], ValidationError> => {
	const allTests = report.testSuites.flatMap((suite) => suite.testCases);
	const filteredTests = allTests.filter((test) => test.status === status);
	return success(filteredTests);
};

export const filterTestsByPattern = (
	report: Report,
	pattern: string,
): Result<readonly TestResult[], ValidationError> => {
	if (!pattern || pattern.trim().length === 0) {
		return failure(
			new ValidationError("Pattern cannot be empty", "pattern", pattern),
		);
	}

	const regex = new RegExp(pattern, "i");
	const allTests = report.testSuites.flatMap((suite) => suite.testCases);
	const filteredTests = allTests.filter(
		(test) => regex.test(test.name) || regex.test(test.location.file),
	);

	return success(filteredTests);
};

export const filterTestsByDuration = (
	report: Report,
	minDuration?: number,
	maxDuration?: number,
): Result<readonly TestResult[], ValidationError> => {
	if (minDuration !== undefined && minDuration < 0) {
		return failure(
			new ValidationError(
				"Minimum duration cannot be negative",
				"minDuration",
				minDuration,
			),
		);
	}

	if (maxDuration !== undefined && maxDuration < 0) {
		return failure(
			new ValidationError(
				"Maximum duration cannot be negative",
				"maxDuration",
				maxDuration,
			),
		);
	}

	if (
		minDuration !== undefined &&
		maxDuration !== undefined &&
		minDuration > maxDuration
	) {
		return failure(
			new ValidationError(
				"Minimum duration cannot be greater than maximum duration",
				"minDuration",
				minDuration,
			),
		);
	}

	const allTests = report.testSuites.flatMap((suite) => suite.testCases);
	const filteredTests = allTests.filter((test) => {
		if (minDuration !== undefined && test.duration < minDuration) return false;
		if (maxDuration !== undefined && test.duration > maxDuration) return false;
		return true;
	});

	return success(filteredTests);
};

export const filterTestsByFile = (
	report: Report,
	filePath: string,
): Result<readonly TestResult[], ValidationError> => {
	if (!filePath || filePath.trim().length === 0) {
		return failure(
			new ValidationError("File path cannot be empty", "filePath", filePath),
		);
	}

	const allTests = report.testSuites.flatMap((suite) => suite.testCases);
	const filteredTests = allTests.filter((test) =>
		test.location.file.includes(filePath),
	);

	return success(filteredTests);
};

export const filterSuitesByStatus = (
	report: Report,
	status: TestStatus,
): Result<readonly TestSuite[], ValidationError> => {
	const filteredSuites = report.testSuites.filter(
		(suite) => suite.status === status,
	);
	return success(filteredSuites);
};

export const filterSuitesByName = (
	report: Report,
	name: string,
): Result<readonly TestSuite[], ValidationError> => {
	if (!name || name.trim().length === 0) {
		return failure(
			new ValidationError("Suite name cannot be empty", "name", name),
		);
	}

	const regex = new RegExp(name, "i");
	const filteredSuites = report.testSuites.filter((suite) =>
		regex.test(suite.name),
	);

	return success(filteredSuites);
};

export const getFailedTests = (report: Report): readonly TestResult[] => {
	return report.testSuites
		.flatMap((suite) => suite.testCases)
		.filter((test) => test.status === TEST_STATUS.FAILED);
};

export const getPassedTests = (report: Report): readonly TestResult[] => {
	return report.testSuites
		.flatMap((suite) => suite.testCases)
		.filter((test) => test.status === TEST_STATUS.PASSED);
};

export const getSkippedTests = (report: Report): readonly TestResult[] => {
	return report.testSuites
		.flatMap((suite) => suite.testCases)
		.filter((test) => test.status === TEST_STATUS.SKIPPED);
};

export const getSlowTests = (
	report: Report,
	threshold: number,
): readonly TestResult[] => {
	return report.testSuites
		.flatMap((suite) => suite.testCases)
		.filter((test) => test.duration > threshold)
		.sort((a, b) => b.duration - a.duration);
};

export const getFastTests = (
	report: Report,
	threshold: number,
): readonly TestResult[] => {
	return report.testSuites
		.flatMap((suite) => suite.testCases)
		.filter((test) => test.duration < threshold)
		.sort((a, b) => a.duration - b.duration);
};

export const getTestsWithErrors = (report: Report): readonly TestResult[] => {
	return report.testSuites
		.flatMap((suite) => suite.testCases)
		.filter((test) => test.error !== null);
};

export const getTestsWithFailedAssertions = (
	report: Report,
): readonly TestResult[] => {
	return report.testSuites
		.flatMap((suite) => suite.testCases)
		.filter((test) => test.assertions.some((assertion) => !assertion.passed));
};

export const groupTestsByStatus = (
	report: Report,
): Readonly<Record<TestStatus, readonly TestResult[]>> => {
	const allTests = report.testSuites.flatMap((suite) => suite.testCases);
	const grouped = {} as Record<TestStatus, readonly TestResult[]>;

	for (const status of [
		TEST_STATUS.PASSED,
		TEST_STATUS.FAILED,
		TEST_STATUS.SKIPPED,
		TEST_STATUS.PENDING,
		TEST_STATUS.RUNNING,
	]) {
		grouped[status] = allTests.filter((test) => test.status === status);
	}

	return grouped;
};

export const groupTestsByFile = (
	report: Report,
): Readonly<Record<string, readonly TestResult[]>> => {
	const allTests = report.testSuites.flatMap((suite) => suite.testCases);
	const grouped = {} as Record<string, readonly TestResult[]>;

	for (const test of allTests) {
		const file = test.location.file;
		if (!grouped[file]) {
			grouped[file] = [];
		}
		grouped[file] = [...grouped[file], test];
	}

	return grouped;
};

export const groupTestsBySuite = (
	report: Report,
): Readonly<Record<string, readonly TestResult[]>> => {
	const grouped = {} as Record<string, readonly TestResult[]>;

	for (const suite of report.testSuites) {
		grouped[suite.name] = suite.testCases;
	}

	return grouped;
};

export const searchTests = (
	report: Report,
	query: string,
): Result<readonly TestResult[], ValidationError> => {
	if (!query || query.trim().length === 0) {
		return failure(
			new ValidationError("Search query cannot be empty", "query", query),
		);
	}

	const regex = new RegExp(query, "i");
	const allTests = report.testSuites.flatMap((suite) => suite.testCases);

	const matchingTests = allTests.filter(
		(test) =>
			regex.test(test.name) ||
			regex.test(test.location.file) ||
			(test.error && regex.test(test.error.message)),
	);

	return success(matchingTests);
};
