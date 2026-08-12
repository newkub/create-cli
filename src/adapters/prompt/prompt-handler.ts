/**
 * Adapters layer - Prompt handler
 * Entry point for prompt operations using pure domain functions
 *
 * NOTE: Prompt module is not included in this merge.
 * This file is kept for future implementation.
 */

import { applyColorFormatting } from "#modules/color/domain/operations";
import type { ColorName } from "#modules/color/types";

/**
 * Infrastructure dependencies for prompt operations
 */
export const PromptInfrastructure = {
	/**
	 * Read input from stdin
	 */
	readInput(prompt: string): Promise<string> {
		return new Promise((resolve) => {
			const globalProcess = globalThis as typeof globalThis & {
				process?: {
					stdin?: unknown;
					stdout?: { write: (text: string) => void };
				};
			};
			if (globalProcess.process?.stdin && globalProcess.process.stdout) {
				globalProcess.process.stdout.write(prompt);
				resolve("");
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
				bunGlobal.Bun.write(bunGlobal.stdout, prompt);
				resolve("");
			} else {
				resolve("");
			}
		});
	},

	/**
	 * Apply color formatting using domain logic
	 */
	applyColor(text: string, color?: ColorName): string {
		if (!color) return text;
		return applyColorFormatting(text, color);
	},

	/**
	 * Get current timestamp
	 */
	getCurrentTime(): number {
		return Date.now();
	},
} as const;

/**
 * Prompt adapter - handles external interface
 * NOTE: Not implemented - prompt module not included in merge
 */

/**
 * Ask a simple question - Functional implementation
 */
export const askQuestion = (question: string): Promise<string> => {
	return PromptInfrastructure.readInput(question);
};

/**
 * Factory function to create prompt adapter
 */
export function createPromptAdapter() {
	return { askQuestion };
}

/**
 * Default prompt adapter instance
 */
export const prompt = createPromptAdapter();
