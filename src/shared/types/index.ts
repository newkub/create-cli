/**
 * Shared types - Common type definitions used across the project
 */

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> =
	| { success: true; data: T }
	| { success: false; error: E };

/**
 * Async Result type
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Color styling types
 */
export type ColorCode = string;
export type StyleModifier =
	| "bold"
	| "dim"
	| "italic"
	| "underline"
	| "inverse"
	| "hidden"
	| "strikethrough";

export type ColorName =
	| "black"
	| "red"
	| "green"
	| "yellow"
	| "blue"
	| "magenta"
	| "cyan"
	| "white"
	| "gray"
	| "grey"
	| "brightBlack"
	| "brightRed"
	| "brightGreen"
	| "brightYellow"
	| "brightBlue"
	| "brightMagenta"
	| "brightCyan"
	| "brightWhite";

export type BgColorName = ColorName;
export type ModifierName = StyleModifier;

export type ColorStyle = {
	readonly color?: ColorCode;
	readonly backgroundColor?: ColorCode;
	readonly modifiers?: readonly StyleModifier[];
};

/**
 * Position and size types
 */
export type Position = {
	readonly x: number;
	readonly y: number;
};

export type Size = {
	readonly width: number;
	readonly height: number;
};

/**
 * Box styling types
 */
export type BoxStyle = {
	readonly border?: boolean;
	readonly padding?: number;
	readonly margin?: number;
	readonly style?: ColorStyle;
};

/**
 * Spinner types
 */
export type SpinnerType =
	| "dots"
	| "line"
	| "pipe"
	| "bounce"
	| "arrow"
	| "clock";

export type SpinnerOptions = {
	readonly type?: SpinnerType;
	readonly interval?: number;
	readonly style?: ColorStyle;
	readonly text?: string;
};

export type SpinnerState = {
	readonly frame: number;
	readonly text: string;
	readonly isRunning: boolean;
};

/**
 * Progress types
 */
export type ProgressBarOptions = {
	readonly width?: number;
	readonly character?: string;
	readonly incompleteCharacter?: string;
	readonly style?: ColorStyle;
};

export type ProgressState = {
	readonly current: number;
	readonly total: number;
	readonly percentage: number;
	readonly isComplete: boolean;
};

export type ProgressRender = {
	readonly text: string;
	readonly state: ProgressState;
};

export type MultiProgressBar = {
	readonly segments: readonly {
		id: string;
		current: number;
		total: number;
		text?: string;
	}[];
};

// Either type and utilities
export type { Either, Left, Right } from "./either";
export {
	chain as chainEither,
	isLeft,
	isRight,
	left,
	map as mapEither,
	mapLeft,
	right,
} from "./either";
// Factory functions
export {
	createBoxStyle,
	createColorStyle,
	createMultiProgressBar,
	createPosition,
	createProgressBarOptions,
	createProgressRender,
	createProgressState,
	createSize,
	createSpinnerOptions,
	createSpinnerState,
} from "./factories";
// Option type and utilities
export type { None, Option, Some } from "./option";
export {
	isNone,
	isSome,
	map as mapOption,
	none,
	some,
	unwrap as unwrapOption,
	unwrapOrThrow,
} from "./option";
// Result utilities
export {
	chain as chainResult,
	failure,
	map as mapResult,
	mapError,
	success,
	unwrap as unwrapResult,
} from "./result";

// Terminal configuration type
export type TerminalConfig = {
	readonly width?: number;
	readonly height?: number;
	readonly encoding?: "utf-8" | "utf-16";
};
