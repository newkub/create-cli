/**
 * Terminal Port Interface
 * Defines the contract for terminal I/O operations
 */

export interface ITerminalPort {
	write(content: string): void;
	clear(): void;
	moveCursor(x: number, y: number): void;
	hideCursor(): void;
	showCursor(): void;
	getSize(): { width: number; height: number };
}

export interface IInputPort {
	onData(callback: (data: Uint8Array) => void): () => void;
}

export interface IRendererPort {
	render(output: { content: string; width: number; height: number }): void;
	cleanup(): void;
}
