/**
 * Terminal port interface - defines contract for terminal I/O
 * Pure interface, no implementation
 */

export interface ITerminalPort {
	readonly read: () => Promise<string>;
	readonly write: (text: string) => Promise<void>;
	readonly clear: () => Promise<void>;
	readonly hideCursor: () => Promise<void>;
	readonly showCursor: () => Promise<void>;
	readonly moveTo: (x: number, y: number) => Promise<void>;
}
