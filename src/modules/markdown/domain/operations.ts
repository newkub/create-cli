/**
 * Markdown domain operations - Pure functions for markdown rendering
 */

import type {
	MarkdownElement,
	MarkdownOptions,
	MarkdownRender,
} from "#modules/markdown/types";
import { truncate } from "#shared/utils";

export const parseMarkdown = (text: string): MarkdownElement[] => {
	const lines = text.split("\n");
	const elements: MarkdownElement[] = [];

	for (const line of lines) {
		const trimmed = line.trim();

		// Headers
		if (trimmed.startsWith("#")) {
			const level = trimmed.match(/^#+/)?.[0].length || 1;
			const content = trimmed.replace(/^#+\s*/, "");
			elements.push({
				type: "heading",
				content,
				level,
			});
		}
		// Lists
		else if (trimmed.match(/^[-*+]\s/)) {
			const content = trimmed.replace(/^[-*+]\s/, "");
			elements.push({
				type: "list",
				content,
			});
		}
		// Code blocks
		else if (trimmed.startsWith("```")) {
			elements.push({
				type: "code",
				content: trimmed.replace(/```/g, ""),
			});
		}
		// Quotes
		else if (trimmed.startsWith(">")) {
			const content = trimmed.replace(/^>\s?/, "");
			elements.push({
				type: "quote",
				content,
			});
		}
		// Paragraphs
		else if (trimmed) {
			elements.push({
				type: "paragraph",
				content: trimmed,
			});
		}
	}

	return elements;
};

const renderHeading = (element: MarkdownElement, width: number): string => {
	const prefix = `${"#".repeat(element.level || 1)} `;
	const content = truncate(element.content, width - prefix.length - 1);
	return prefix + content;
};

const renderParagraph = (element: MarkdownElement, width: number): string => {
	return truncate(element.content, width);
};

const renderList = (element: MarkdownElement, width: number): string => {
	const prefix = "• ";
	const content = truncate(element.content, width - prefix.length - 1);
	return prefix + content;
};

const renderCode = (element: MarkdownElement, width: number): string => {
	const content = truncate(element.content, width - 4);
	return `[ ${content} ]`;
};

const renderQuote = (element: MarkdownElement, width: number): string => {
	const prefix = "│ ";
	const content = truncate(element.content, width - prefix.length - 1);
	return prefix + content;
};

export const renderMarkdown = (
	markdown: string,
	options: MarkdownOptions = {},
): MarkdownRender => {
	const { width = 80 } = options;

	const elements = parseMarkdown(markdown);
	const lines: string[] = [];

	for (const element of elements) {
		let renderedLine = "";

		switch (element.type) {
			case "heading":
				renderedLine = renderHeading(element, width);
				break;
			case "paragraph":
				renderedLine = renderParagraph(element, width);
				break;
			case "list":
				renderedLine = renderList(element, width);
				break;
			case "code":
				renderedLine = renderCode(element, width);
				break;
			case "quote":
				renderedLine = renderQuote(element, width);
				break;
			default:
				renderedLine = element.content;
		}

		lines.push(renderedLine);
	}

	return {
		lines,
		size: { width, height: lines.length },
	};
};

export const validateMarkdownOptions = (options: MarkdownOptions): boolean => {
	const { width } = options;

	if (width !== undefined && width <= 0) return false;

	return true;
};
