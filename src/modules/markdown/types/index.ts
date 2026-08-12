/**
 * Markdown module types
 */

import type { ColorStyle } from "#shared/types";

export type MarkdownStyle = "default" | "compact" | "detailed";

export interface MarkdownOptions {
	readonly width?: number;
	readonly style?: MarkdownStyle;
	readonly colorize?: boolean;
	readonly styleOverrides?: ColorStyle;
}

export interface MarkdownRender {
	readonly lines: readonly string[];
	readonly size: { readonly width: number; readonly height: number };
}

export interface MarkdownElement {
	readonly type: "heading" | "paragraph" | "list" | "code" | "quote" | "link";
	readonly content: string;
	readonly level?: number;
	readonly attributes?: Record<string, string>;
}
