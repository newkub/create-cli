/**
 * Search prompt use case - fuzzy search/filter through options
 * Interactive filtering with real-time results
 */

import type { Result } from "#shared/types";
import type { ITerminalPort } from "../../ports";
import type { SelectOption } from "../../types";

export interface SearchPromptOptions<T = string> {
	message: string;
	options: readonly SelectOption<T>[];
	placeholder?: string;
	maxResults?: number;
	validate?: (value: T) => string | undefined;
}

/**
 * Fuzzy match score - returns score (higher = better) or -1 if no match
 */
const fuzzyScore = (query: string, target: string): number => {
	if (!query) return 0;

	const lowerQuery = query.toLowerCase();
	const lowerTarget = target.toLowerCase();

	// Exact match gets highest score
	if (lowerTarget === lowerQuery) return 1000;

	// Starts with query
	if (lowerTarget.startsWith(lowerQuery)) return 500;

	// Contains query as substring
	const substringIdx = lowerTarget.indexOf(lowerQuery);
	if (substringIdx !== -1) return 250 - substringIdx;

	// Fuzzy character-by-character match
	let queryIdx = 0;
	let score = 0;
	let consecutive = 0;

	for (
		let targetIdx = 0;
		targetIdx < lowerTarget.length && queryIdx < lowerQuery.length;
		targetIdx++
	) {
		if (lowerTarget[targetIdx] === lowerQuery[queryIdx]) {
			score += 10 + consecutive * 5;
			consecutive++;
			queryIdx++;
		} else {
			consecutive = 0;
		}
	}

	// All query characters must be matched
	if (queryIdx < lowerQuery.length) return -1;

	return score;
};

const filterOptions = <T>(
	query: string,
	options: readonly SelectOption<T>[],
	maxResults: number,
): SelectOption<T>[] => {
	const scored = options
		.map((opt) => ({
			option: opt,
			score: fuzzyScore(query, opt.label),
		}))
		.filter((item) => item.score >= 0)
		.sort((a, b) => b.score - a.score);

	return scored.slice(0, maxResults).map((item) => item.option);
};

export const searchPrompt = async <T = string>(
	options: SearchPromptOptions<T>,
	terminal: ITerminalPort,
): Promise<Result<T, Error>> => {
	const maxResults = options.maxResults ?? 10;
	let query = "";
	let selectedIdx = 0;
	let filtered = filterOptions("", options.options, maxResults);

	const render = async (): Promise<void> => {
		await terminal.write("\r");
		await terminal.clear();

		const promptText = `${options.message}: ${query}`;
		await terminal.write(promptText);

		if (filtered.length > 0) {
			await terminal.write("\n");
			for (let i = 0; i < filtered.length; i++) {
				const opt = filtered[i]!;
				const marker = i === selectedIdx ? "❯" : " ";
				await terminal.write(
					`  ${marker} ${opt.label}${opt.disabled ? " (disabled)" : ""}\n`,
				);
			}
		} else if (query) {
			await terminal.write("\n  No matches found\n");
		}
	};

	await render();

	// Simple read loop - in a real implementation this would handle
	// individual keypresses. For now, we use a line-based approach.
	const input = await terminal.read();

	// If input looks like a number selection
	const numSelect = Number(input);
	if (
		!Number.isNaN(numSelect) &&
		numSelect > 0 &&
		numSelect <= filtered.length
	) {
		const selected = filtered[numSelect - 1]!;
		if (selected.disabled) {
			return { success: false, error: new Error("Option is disabled") };
		}
		if (options.validate) {
			const customError = options.validate(selected.value);
			if (customError) {
				return { success: false, error: new Error(customError) };
			}
		}
		return { success: true, data: selected.value };
	}

	// Treat input as search query and return first match
	query = input;
	filtered = filterOptions(query, options.options, maxResults);
	selectedIdx = 0;

	if (filtered.length === 0) {
		return { success: false, error: new Error("No matching options found") };
	}

	const selected = filtered[0]!;
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
};
