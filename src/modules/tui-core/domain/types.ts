/**
 * TUI Core Domain Types
 * Pure type definitions for the reactive TUI framework
 */

export type ComponentProps = Record<string, unknown>;

export type ComponentChildren =
	| string
	| Component
	| Component[]
	| Signal<string>
	| Signal<Component>
	| Signal<Component[]>;

export interface Component {
	type: ComponentType;
	props: ComponentProps;
	children?: ComponentChildren;
	key?: string;
}

export type ComponentType = string | ComponentFunction;

export type ComponentFunction = (
	props: ComponentProps,
	children?: ComponentChildren,
) => Component | string | Signal<Component> | Signal<string>;

export interface RenderContext {
	width: number;
	height: number;
	focused: boolean;
}

export interface RenderOutput {
	content: string;
	width: number;
	height: number;
}

export type RenderFunction = (
	props: ComponentProps,
	children?: ComponentChildren,
	context?: RenderContext,
) => RenderOutput | Signal<RenderOutput>;

// Signal type (placeholder until @wrikka/reactive is integrated)
export type Signal<T> = {
	get: () => T;
	set: (value: T) => void;
	subscribe: (callback: (value: T) => void) => () => void;
};
