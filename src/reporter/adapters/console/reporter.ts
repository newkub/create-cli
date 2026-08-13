import { FormattingError } from "#reporter/shared/errors";
import { failure, type Result, success } from "#reporter/shared/types";
import type { Report } from "../../modules/reporter/types";
import { printReport } from "./printers";
import type { ConsoleReporterOptions } from "./types";

export const createConsoleReporter = (options: ConsoleReporterOptions = {}) => {
	const useColors = options.useColors ?? true;
	const verbose = options.verbose ?? false;
	const showCoverage = options.showCoverage ?? true;
	const showSlowTests = options.showSlowTests ?? true;
	const slowThreshold = options.slowThreshold ?? 1000;

	return {
		report: (report: Report): Result<void, FormattingError> => {
			try {
				printReport(report, {
					useColors,
					verbose,
					showCoverage,
					showSlowTests,
					slowThreshold,
				});
				return success<void, FormattingError>(undefined);
			} catch (error) {
				const formattingError = new FormattingError(
					`Failed to format report: ${error instanceof Error ? error.message : String(error)}`,
					"console",
					error instanceof Error ? error : undefined,
				);
				return failure<void, FormattingError>(formattingError);
			}
		},
	};
};
