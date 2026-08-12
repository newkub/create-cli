/**
 * Infrastructure configuration
 * Clean Architecture 2 - Infrastructure layer
 */

/**
 * Terminal configuration options
 */
export type TerminalConfig = {
	readonly colors: boolean;
	readonly interactive: boolean;
	readonly width: number;
	readonly height: number;
};

/**
 * Default terminal configuration
 */
export const defaultTerminalConfig: TerminalConfig = {
	colors: true,
	interactive: true,
	width: (process.stdout?.columns ?? 80) || 80,
	height: (process.stdout?.rows ?? 24) || 24,
} as const;

/**
 * Create terminal configuration with overrides
 */
export const createTerminalConfig = (
	overrides: Partial<TerminalConfig>,
): TerminalConfig =>
	({
		...defaultTerminalConfig,
		...overrides,
	}) as const;
