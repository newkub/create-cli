export interface ConsoleReporterOptions {
	readonly useColors?: boolean;
	readonly verbose?: boolean;
	readonly showCoverage?: boolean;
	readonly showSlowTests?: boolean;
	readonly slowThreshold?: number;
}
