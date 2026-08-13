import { TEST_STATUS, type TestStatus } from "#reporter/shared/constants";
import type { Report, TestResult, TestSuite } from "../../types";

export const determineSuiteStatus = (
	testCases: readonly TestResult[],
): TestStatus => {
	if (testCases.length === 0) return TEST_STATUS.PENDING;

	const hasFailed = testCases.some((t) => t.status === TEST_STATUS.FAILED);
	const hasRunning = testCases.some((t) => t.status === TEST_STATUS.RUNNING);
	const hasPending = testCases.some((t) => t.status === TEST_STATUS.PENDING);

	if (hasFailed) return TEST_STATUS.FAILED;
	if (hasRunning) return TEST_STATUS.RUNNING;
	if (hasPending) return TEST_STATUS.PENDING;

	return TEST_STATUS.PASSED;
};

export const addSuiteToReport = (report: Report, suite: TestSuite): Report => ({
	...report,
	testSuites: [...report.testSuites, suite],
});

export const groupTestsIntoSuites = (
	tests: readonly TestResult[],
): readonly TestSuite[] => {
	const suitesByFile = new Map<string, TestResult[]>();

	for (const test of tests) {
		const file = test.location.file;
		if (!suitesByFile.has(file)) {
			suitesByFile.set(file, []);
		}
		suitesByFile.get(file)?.push(test);
	}

	return Array.from(suitesByFile.entries()).map(([file, fileTests]) => ({
		name: file,
		filePath: file,
		testCases: fileTests,
		startTime: new Date(
			Math.min(...fileTests.map((t) => t.startTime.getTime())),
		),
		endTime: new Date(
			Math.max(...fileTests.map((t) => (t.endTime ?? new Date()).getTime())),
		),
		duration: fileTests.reduce((sum, t) => sum + t.duration, 0),
		status: determineSuiteStatus(fileTests),
	}));
};

export const calculateStatsFromTests = (tests: readonly TestResult[]) => {
	const stats = {
		suites: new Set(tests.map((t) => t.location.file)).size,
		tests: tests.length,
		passed: tests.filter((t) => t.status === TEST_STATUS.PASSED).length,
		failed: tests.filter((t) => t.status === TEST_STATUS.FAILED).length,
		skipped: tests.filter((t) => t.status === TEST_STATUS.SKIPPED).length,
		pending: tests.filter((t) => t.status === TEST_STATUS.PENDING).length,
		assertions: tests.reduce((sum, t) => sum + t.assertions.length, 0),
		timing: {
			total: tests.reduce((sum, t) => sum + t.duration, 0),
			average: 0,
			slowest: 0,
			fastest: Infinity,
		},
	};

	const durations = tests.map((t) => t.duration);
	if (durations.length > 0) {
		stats.timing.average =
			durations.reduce((a, b) => a + b, 0) / durations.length;
		stats.timing.slowest = Math.max(...durations);
		stats.timing.fastest = Math.min(...durations);
	}

	return stats;
};
