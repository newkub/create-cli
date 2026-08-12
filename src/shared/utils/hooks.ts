/**
 * Reactive hooks for TUI components
 * Inspired by React hooks but using placeholder Signal type
 * Note: Using local Signal implementation until @wrikka/reactive is integrated
 */

// Local Signal implementation
export type Signal<T> = {
	get: () => T;
	set: (value: T) => void;
	subscribe: (callback: (value: T) => void) => () => void;
};

const create = <T>(initial: T): Signal<T> => {
	let value = initial;
	const listeners = new Set<(value: T) => void>();

	return {
		get: () => value,
		set: (newValue: T) => {
			value = newValue;
			for (const listener of listeners) {
				listener(value);
			}
		},
		subscribe: (callback: (value: T) => void) => {
			listeners.add(callback);
			return () => listeners.delete(callback);
		},
	};
};

export type HookCleanup = () => void;

export interface UseInputOptions {
	enable?: boolean;
}

export interface InputEvent {
	key: string;
	ctrl: boolean;
	meta: boolean;
	shift: boolean;
}

export function useInput(
	handler: (input: InputEvent) => void,
	options: UseInputOptions = {},
): HookCleanup {
	const { enable = true } = options;

	if (!enable) return () => {};

	const handleInput = (data: Uint8Array) => {
		const str = new TextDecoder().decode(data);
		handler({
			key: str,
			ctrl: false,
			meta: false,
			shift: false,
		});
	};

	process.stdin.on("data", handleInput);

	return () => {
		process.stdin.off("data", handleInput);
	};
}

export function useState<T>(initial: T): Signal<T> {
	return create(initial);
}

export function useEffect(
	effect: () => HookCleanup | undefined,
	_deps?: readonly unknown[],
): HookCleanup {
	// Simple effect - in production, track dependencies
	const cleanup = effect();
	return cleanup || (() => {});
}

export function useMemo<T>(
	factory: () => T,
	_deps?: readonly unknown[],
): Signal<T> {
	const value = create(factory());

	// In production, recompute when deps change

	return value;
}

export function useCallback<T extends (...args: unknown[]) => unknown>(
	callback: T,
	_deps?: readonly unknown[],
): T {
	return callback;
}

export function useRef<T>(initial: T): { current: T } {
	return { current: initial };
}

export function useFocus(
	options: { autoFocus?: boolean } = {},
): Signal<boolean> {
	const focused = create(options.autoFocus ?? false);
	return focused;
}

export function useStdin(): Signal<Uint8Array<ArrayBufferLike>> {
	const stdin = create<Uint8Array<ArrayBufferLike>>(
		new Uint8Array(new ArrayBuffer(0)) as Uint8Array<ArrayBufferLike>,
	);

	process.stdin.on("data", (data: Buffer) => {
		stdin.set(
			new Uint8Array(
				data.buffer,
				data.byteOffset,
				data.byteLength,
			) as Uint8Array<ArrayBufferLike>,
		);
	});

	return stdin;
}

export function useStdout(): NodeJS.WriteStream {
	return process.stdout;
}

export function useTerminal(): {
	stdin: NodeJS.ReadStream;
	stdout: NodeJS.WriteStream;
} {
	return { stdin: process.stdin, stdout: process.stdout };
}

export function useWindowSize(): Signal<{ width: number; height: number }> {
	const size = create({
		width: process.stdout.columns || 80,
		height: process.stdout.rows || 24,
	});

	// In production, listen to resize events
	process.stdout.on("resize", () => {
		size.set({
			width: process.stdout.columns || 80,
			height: process.stdout.rows || 24,
		});
	});

	return size;
}
