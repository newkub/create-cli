/**
 * Spinner domain operations - Pure functions for spinner rendering
 */

import type {
	SpinnerOptions,
	SpinnerRender,
	SpinnerState,
	SpinnerType,
} from "#modules/spinner/types";

const SPINNER_FRAMES: Record<SpinnerType, readonly string[]> = {
	dots: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
	line: ["|", "/", "-", "\\"],
	pipe: ["||", "||", "|||", "||||", "|||", "||"],
	bounce: ["⠁", "⠂", "⠄", "⠈", "⠐", "⠠", "⠤", "⠆", "⠃", "⠇"],
	arrow: ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"],
	clock: [
		"🕐",
		"🕑",
		"🕒",
		"🕓",
		"🕔",
		"🕕",
		"🕖",
		"🕗",
		"🕘",
		"🕙",
		"🕚",
		"🕛",
	],
};

export const getSpinnerFrames = (type: SpinnerType): readonly string[] =>
	SPINNER_FRAMES[type];

export const createSpinnerState = (
	frame: number = 0,
	text: string = "",
	isRunning: boolean = false,
): SpinnerState => ({
	frame,
	text,
	isRunning,
});

export const renderSpinner = (
	state: SpinnerState,
	options: SpinnerOptions = {},
): SpinnerRender => {
	const { type = "dots", text = "" } = options;

	const frames = getSpinnerFrames(type);
	const currentFrame = frames[state.frame % frames.length];

	const displayText = text ? `${currentFrame} ${text}` : currentFrame;

	return {
		text: displayText,
		state,
	};
};

export const advanceSpinner = (state: SpinnerState): SpinnerState => ({
	...state,
	frame: state.frame + 1,
});

export const startSpinner = (
	state: SpinnerState,
	text?: string,
): SpinnerState => ({
	...state,
	text: text ?? state.text,
	isRunning: true,
	frame: 0,
});

export const stopSpinner = (
	state: SpinnerState,
	finalText?: string,
): SpinnerState => ({
	...state,
	text: finalText ?? state.text,
	isRunning: false,
});

export const validateSpinnerOptions = (options: SpinnerOptions): boolean => {
	const { type, interval } = options;

	if (type !== undefined && !Object.keys(SPINNER_FRAMES).includes(type)) {
		return false;
	}

	if (interval !== undefined && interval <= 0) {
		return false;
	}

	return true;
};
