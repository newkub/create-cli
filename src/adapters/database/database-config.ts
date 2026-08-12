/**
 * Database infrastructure (placeholder for future use)
 * Clean Architecture 2 - Infrastructure layer
 */

/**
 * Database connection configuration
 */
export type DatabaseConfig = {
	readonly type: "memory" | "file";
	readonly path?: string;
};

/**
 * Default database configuration
 */
export const defaultDatabaseConfig: DatabaseConfig = {
	type: "memory",
} as const;

/**
 * Create database configuration with overrides
 */
export const createDatabaseConfig = (
	overrides: Partial<DatabaseConfig>,
): DatabaseConfig =>
	({
		...defaultDatabaseConfig,
		...overrides,
	}) as const;
