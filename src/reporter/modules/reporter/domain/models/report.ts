/**
 * Reporter Module - Domain Models
 * Clean Architecture: Domain Layer - report model operations
 */

// Re-export from operations
export {
	getFailedTests,
	getSlowTests,
	groupTestsBySuite,
} from "../operations/report-filtering";
