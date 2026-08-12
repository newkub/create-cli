/**
 * Render engine using Bun native APIs
 * Handles terminal output, cursor positioning, and screen updates
 */

import type {
	RenderContext,
	RenderOutput,
} from "#modules/tui-core/domain/types";

export class Renderer {
	private stdout: typeof Bun.stdout;
	private context: RenderContext;
	private lastOutput: string = "";

	constructor(stdout: typeof Bun.stdout = Bun.stdout) {
		this.stdout = stdout;
		this.context = {
			width: this.getTerminalWidth(),
			height: this.getTerminalHeight(),
			focused: true,
		};
	}

	private getTerminalWidth(): number {
		return process.stdout.columns || 80;
	}

	private getTerminalHeight(): number {
		return process.stdout.rows || 24;
	}

	private clearScreen(): void {
		this.stdout.write("\x1b[2J\x1b[H");
	}

	private moveCursor(x: number, y: number): void {
		this.stdout.write(`\x1b[${y};${x}H`);
	}

	private showCursor(): void {
		this.stdout.write("\x1b[?25h");
	}

	public updateContext(): void {
		this.context.width = this.getTerminalWidth();
		this.context.height = this.getTerminalHeight();
	}

	public getContext(): RenderContext {
		return { ...this.context };
	}

	public render(output: RenderOutput): void {
		const content = output.content;

		// Only update if content changed
		if (content !== this.lastOutput) {
			this.clearScreen();
			this.moveCursor(1, 1);
			this.stdout.write(content);
			this.lastOutput = content;
		}
	}

	public static diff(oldOutput: string, newOutput: string): string {
		// Simple diff - in production, use more sophisticated algorithm
		if (oldOutput === newOutput) return "";
		return newOutput;
	}

	public cleanup(): void {
		this.showCursor();
		this.clearScreen();
		this.moveCursor(1, 1);
	}
}
