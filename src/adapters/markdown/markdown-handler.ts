/**
 * Adapters layer - Markdown handler
 * Entry point for markdown operations using pure domain functions
 */

import { applyColorFormatting } from "#modules/color/domain/operations";
import type { ColorName } from "#modules/color/types";
import {
	renderMarkdown as renderMarkdownDomain,
	validateMarkdownOptions,
} from "#modules/markdown/domain/operations";
import type { MarkdownOptions } from "#modules/markdown/types";

/**
 * Infrastructure dependencies for markdown operations
 */
export const MarkdownInfrastructure = {
	/**
	 * Apply color formatting using domain logic
	 */
	applyColor(text: string, color?: ColorName): string {
		if (!color) return text;
		return applyColorFormatting(text, color);
	},
} as const;

/**
 * Markdown adapter - handles external interface with direct domain calls
 */

/**
 * Render markdown text - Functional implementation
 */
export const renderMarkdown = (
	text: string,
	options?: MarkdownOptions,
): string => {
	const render = renderMarkdownDomain(text, options);
	return render.lines.join("\n");
};

/**
 * Validate markdown options - Functional implementation
 */
export const validateOptions = (options: MarkdownOptions): boolean => {
	return validateMarkdownOptions(options);
};

/**
 * Factory function to create markdown adapter
 */
export function createMarkdownAdapter() {
	return { renderMarkdown, validateOptions };
}

/**
 * Default markdown adapter instance
 */
export const markdown = createMarkdownAdapter();
