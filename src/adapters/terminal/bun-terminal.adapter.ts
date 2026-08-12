/**
 * Bun terminal adapter - implements ITerminalPort using Bun native APIs
 * Side effects only, no business logic
 */

import type { ITerminalPort } from "../../modules/prompt/ports";

export class BunTerminalAdapter implements ITerminalPort {
	async read(): Promise<string> {
		// Use Bun's stdin.read directly - simpler and avoids type issues
		const buffer = new Uint8Array(1024);
		// @ts-expect-error - Bun.stdin.read is available at runtime despite type errors
		const n = Bun.stdin.read(buffer);
		if (n === null) return "";
		return new TextDecoder().decode(buffer.slice(0, n)).trim();
	}

	async write(text: string): Promise<void> {
		await Bun.stdout.write(new TextEncoder().encode(text));
	}

	async clear(): Promise<void> {
		await this.write("\x1b[2K");
	}

	async hideCursor(): Promise<void> {
		await this.write("\x1b[?25l");
	}

	async showCursor(): Promise<void> {
		await this.write("\x1b[?25h");
	}

	async moveTo(x: number, y: number): Promise<void> {
		await this.write(`\x1b[${y};${x}H`);
	}

	async cleanup(): Promise<void> {
		await this.showCursor();
	}
}
