/**
 * Adapters layer - Box handler
 * Entry point for box operations using pure domain functions
 */

import {
	getBorderChars as getBorderCharsDomain,
	renderBox,
	validateBoxOptions,
} from "#modules/box/domain/operations";
import type { BorderStyle, BoxOptions } from "#modules/box/types";
import { applyColorFormatting } from "#modules/color/domain/operations";
import type { ColorName } from "#modules/color/types";

/**
 * Infrastructure dependencies for box operations
 */
export const BoxInfrastructure = {
	/**
	 * Apply color formatting using domain logic
	 */
	applyColor(text: string, color?: ColorName): string {
		if (!color) return text;
		return applyColorFormatting(text, color);
	},
} as const;

/**
 * Box adapter - handles external interface with direct domain calls
 */

/**
 * Create a box around content - Functional implementation
 */
export const createBox = (
	content: string,
	options: BoxOptions & { border?: BorderStyle } = {},
): string => {
	return renderBox({ content, ...options });
};

/**
 * Validate box options - Functional implementation
 */
export const validateOptions = (options: BoxOptions): boolean => {
	return validateBoxOptions(options);
};

/**
 * Get border characters for a style - Functional implementation
 */
export const getBorderChars = (style: BorderStyle) => {
	return getBorderCharsDomain(style);
};

/**
 * Factory function to create box adapter
 */
export function createBoxAdapter() {
	return { createBox, validateOptions, getBorderChars };
}

/**
 * Default box adapter instance
 */
export const box = createBoxAdapter();
