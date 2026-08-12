/**
 * Box module types
 */

import type { ColorStyle, Position, Size } from "#shared/types";

export type BorderStyle = "single" | "double" | "rounded" | "dashed" | "dotted";

export type BorderCharacter = {
	readonly topLeft: string;
	readonly topRight: string;
	readonly bottomLeft: string;
	readonly bottomRight: string;
	readonly horizontal: string;
	readonly vertical: string;
};

export interface BoxOptions {
	readonly width?: number;
	readonly height?: number;
	readonly border?: BorderStyle;
	readonly padding?: number;
	readonly margin?: number;
	readonly style?: ColorStyle;
	readonly position?: Position;
	readonly content?: string;
}

export interface BoxRender {
	readonly lines: readonly string[];
	readonly size: Size;
}
