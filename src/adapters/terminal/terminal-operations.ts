/**
 * Terminal infrastructure - Side effect implementations
 * Clean Architecture 2 - Infrastructure layer
 */

/**
 * Write to stdout using Node.js/Bun process APIs
 */
export const writeToStdout = (text: string): void => {
	const globalProcess = globalThis as typeof globalThis & {
		process?: { stdout?: { write: (text: string) => void } };
	};
	if (globalProcess.process?.stdout) {
		globalProcess.process.stdout.write(text);
	} else if (
		typeof (
			globalThis as typeof globalThis & {
				Bun?: { write: (stdout: unknown, text: string) => void };
			}
		).Bun !== "undefined"
	) {
		const bunGlobal = globalThis as typeof globalThis & {
			Bun: { write: (stdout: unknown, text: string) => void };
			stdout: unknown;
		};
		bunGlobal.Bun.write(bunGlobal.stdout, text);
	}
};

/**
 * Clear current line using ANSI escape codes
 */
export const clearLine = (): void => {
	const globalProcess = globalThis as typeof globalThis & {
		process?: { stdout?: { write: (text: string) => void } };
	};
	globalProcess.process?.stdout?.write("\r\x1b[K");
};
