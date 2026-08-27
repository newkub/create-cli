/**
 * Async prompt use case - async loading state while fetching options
 * Shows a spinner while options are being loaded, then presents a select prompt
 */

import type { Result } from "#shared/types";
import type { ITerminalPort } from "../../ports";
import type { SelectOption } from "../../types";

export interface AsyncPromptOptions<T = string> {
	message: string;
	loader: () => Promise<readonly SelectOption<T>[]>;
	placeholder?: string;
	loadingMessage?: string;
	validate?: (value: T) => string | undefined;
}

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const SPINNER_INTERVAL = 80;

export const asyncPrompt = async <T = string>(
	options: AsyncPromptOptions<T>,
	terminal: ITerminalPort,
): Promise<Result<T, Error>> => {
	const loadingMsg = options.loadingMessage ?? "Loading...";

	// Show spinner while loading
	let frameIdx = 0;
	let spinning = true;

	const spinnerInterval = setInterval(async () => {
		if (!spinning) return;
		await terminal.write("\r");
		await terminal.clear();
		const frame = SPINNER_FRAMES[frameIdx % SPINNER_FRAMES.length];
		await terminal.write(`${frame} ${loadingMsg}`);
		frameIdx++;
	}, SPINNER_INTERVAL);

	let loadedOptions: readonly SelectOption<T>[];
	try {
		loadedOptions = await options.loader();
	} catch (error) {
		spinning = false;
		clearInterval(spinnerInterval);
		await terminal.write("\r");
		await terminal.clear();
		return {
			success: false,
			error: error instanceof Error ? error : new Error(String(error)),
		};
	}

	spinning = false;
	clearInterval(spinnerInterval);
	await terminal.write("\r");
	await terminal.clear();

	if (loadedOptions.length === 0) {
		return { success: false, error: new Error("No options available") };
	}

	// Present options as a simple select
	await terminal.write(`${options.message}\n`);
	for (let i = 0; i < loadedOptions.length; i++) {
		const opt = loadedOptions[i]!;
		await terminal.write(
			`  ${i + 1}. ${opt.label}${opt.disabled ? " (disabled)" : ""}\n`,
		);
	}
	await terminal.write(`> `);

	const input = await terminal.read();
	const numSelect = Number(input);

	if (
		!Number.isNaN(numSelect) &&
		numSelect > 0 &&
		numSelect <= loadedOptions.length
	) {
		const selected = loadedOptions[numSelect - 1]!;
		if (selected.disabled) {
			return { success: false, error: new Error("Option is disabled") };
		}
		if (options.validate) {
			const customError = options.validate(selected.value);
			if (customError) {
				return { success: false, error: new Error(customError) };
			}
		}
		await terminal.write("\r");
		await terminal.clear();
		return { success: true, data: selected.value };
	}

	return { success: false, error: new Error("Invalid selection") };
};
