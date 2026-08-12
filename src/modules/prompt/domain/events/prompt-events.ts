/**
 * Domain event types for prompt lifecycle
 * Pure data structures, no handlers
 */

export type PromptEventType =
	| "start"
	| "input"
	| "submit"
	| "cancel"
	| "error"
	| "complete";

export interface PromptEvent<T = unknown> {
	readonly type: PromptEventType;
	readonly timestamp: number;
	readonly data?: T;
}

export interface PromptStartEvent extends PromptEvent {
	readonly type: "start";
	readonly data: { promptType: string };
}

export interface PromptInputEvent extends PromptEvent {
	readonly type: "input";
	readonly data: { value: string };
}

export interface PromptSubmitEvent extends PromptEvent {
	readonly type: "submit";
	readonly data: { value: unknown };
}

export interface PromptCancelEvent extends PromptEvent {
	readonly type: "cancel";
}

export interface PromptErrorEvent extends PromptEvent {
	readonly type: "error";
	readonly data: { error: string };
}

export interface PromptCompleteEvent extends PromptEvent {
	readonly type: "complete";
	readonly data: { value: unknown };
}

export const createPromptEvent = <T = unknown>(
	type: PromptEventType,
	data?: T,
): PromptEvent<T> => ({
	type,
	timestamp: Date.now(),
	data,
});
