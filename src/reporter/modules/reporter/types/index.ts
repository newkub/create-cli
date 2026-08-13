import type {
	OutputFormat,
	ReportStatus,
	TestStatus,
} from "../../../shared/constants";

// Domain types for reporter module

export type TestResult = {
	readonly name: string;
	readonly status: TestStatus;
	readonly duration: number;
	readonly startTime: Date;
	readonly endTime: Date | null;
	readonly location: {
		readonly file: string;
		readonly line: number | null;
		readonly column: number | null;
	};
	readonly error: {
		readonly message: string;
		readonly stack: string | null;
		readonly actual: unknown | null;
		readonly expected: unknown | null;
	} | null;
	readonly assertions: readonly {
		readonly passed: boolean;
		readonly message: string | null;
		readonly actual: unknown | null;
		readonly expected: unknown | null;
	}[];
};

export type TestSuite = {
	readonly name: string;
	readonly filePath: string;
	readonly testCases: readonly TestResult[];
	readonly startTime: Date;
	readonly endTime: Date | null;
	readonly duration: number | null;
	readonly status: TestStatus;
};

export type TestStats = {
	readonly suites: number;
	readonly tests: number;
	readonly passed: number;
	readonly failed: number;
	readonly skipped: number;
	readonly pending: number;
	readonly assertions: number;
	readonly timing: {
		readonly total: number;
		readonly average: number;
		readonly slowest: number;
		readonly fastest: number;
	};
};

export type CoverageMetrics = {
	readonly lines: {
		readonly covered: number;
		readonly total: number;
		readonly percentage: number;
	};
	readonly functions: {
		readonly covered: number;
		readonly total: number;
		readonly percentage: number;
	};
	readonly branches: {
		readonly covered: number;
		readonly total: number;
		readonly percentage: number;
	};
	readonly statements: {
		readonly covered: number;
		readonly total: number;
		readonly percentage: number;
	};
};

export type ReportConfig = {
	readonly format: OutputFormat;
	readonly useColors?: boolean;
	readonly verbose?: boolean;
	readonly showCoverage?: boolean;
	readonly showSlowTests?: boolean;
	readonly slowThreshold?: number;
	readonly outputFile?: string;
	readonly includePassed?: boolean;
	readonly includeSkipped?: boolean;
};

export type Report = {
	readonly id: string;
	readonly title: string;
	readonly status: ReportStatus;
	readonly startTime: Date;
	readonly endTime: Date | null;
	readonly duration: number | null;
	readonly testSuites: readonly TestSuite[];
	readonly stats: TestStats;
	readonly coverage: CoverageMetrics | null;
	readonly metadata: Readonly<Record<string, unknown>>;
};

export type ReportSummary = {
	readonly stats: TestStats;
	readonly duration: number;
	readonly success: boolean;
	readonly hasCoverage: boolean;
	readonly coverage: CoverageMetrics | null;
};

export type ReporterOptions = {
	readonly config: ReportConfig;
	readonly onProgress?: (
		current: number,
		total: number,
		currentTest: string,
	) => void;
	readonly onTestStart?: (test: TestResult) => void;
	readonly onTestEnd?: (test: TestResult) => void;
	readonly onSuiteStart?: (suite: TestSuite) => void;
	readonly onSuiteEnd?: (suite: TestSuite) => void;
};
