/**
 * Diff renderer - renders side-by-side or inline diffs
 */

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";

export type DiffType = "side-by-side" | "inline" | "unified";

export interface DiffLine {
	type: "added" | "removed" | "unchanged" | "context";
	oldLineNumber?: number;
	newLineNumber?: number;
	content: string;
	oldContent?: string;
}

export interface DiffOptions {
	/** Old text content */
	oldText: string;
	/** New text content */
	newText: string;
	/** Diff display type */
	type?: DiffType;
	/** Context lines around changes (for unified) */
	contextLines?: number;
	/** Show line numbers */
	showLineNumbers?: boolean;
	/** Width for side-by-side display */
	width?: number;
}

/**
 * Compute diff lines from old and new text
 */
const computeDiff = (oldText: string, newText: string): DiffLine[] => {
	const oldLines = oldText.split("\n");
	const newLines = newText.split("\n");
	const diffLines: DiffLine[] = [];

	// Simple LCS-based diff
	const matrix: number[][] = Array(oldLines.length + 1)
		.fill(null)
		.map(() => Array(newLines.length + 1).fill(0));

	for (let i = oldLines.length - 1; i >= 0; i--) {
		for (let j = newLines.length - 1; j >= 0; j--) {
			if (oldLines[i] === newLines[j]) {
				matrix[i]![j] = matrix[i + 1]![j + 1]! + 1;
			} else {
				matrix[i]![j] = Math.max(matrix[i + 1]![j]!, matrix[i]![j + 1]!);
			}
		}
	}

	let i = 0;
	let j = 0;
	while (i < oldLines.length && j < newLines.length) {
		if (oldLines[i] === newLines[j]) {
			diffLines.push({
				type: "unchanged",
				oldLineNumber: i + 1,
				newLineNumber: j + 1,
				content: oldLines[i]!,
			});
			i++;
			j++;
		} else if (matrix[i + 1]![j]! >= matrix[i]![j + 1]!) {
			diffLines.push({
				type: "removed",
				oldLineNumber: i + 1,
				content: oldLines[i]!,
			});
			i++;
		} else {
			diffLines.push({
				type: "added",
				newLineNumber: j + 1,
				content: newLines[j]!,
			});
			j++;
		}
	}

	while (i < oldLines.length) {
		diffLines.push({
			type: "removed",
			oldLineNumber: i + 1,
			content: oldLines[i]!,
		});
		i++;
	}

	while (j < newLines.length) {
		diffLines.push({
			type: "added",
			newLineNumber: j + 1,
			content: newLines[j]!,
		});
		j++;
	}

	return diffLines;
};

/**
 * Render a diff between two text blocks
 */
export const renderDiff = (options: DiffOptions): string => {
	const {
		oldText,
		newText,
		type = "unified",
		showLineNumbers = true,
		width = 40,
	} = options;

	const diffLines = computeDiff(oldText, newText);

	if (type === "side-by-side") {
		return renderSideBySide(diffLines, showLineNumbers, width);
	}

	if (type === "inline") {
		return renderInline(diffLines, showLineNumbers);
	}

	return renderUnified(diffLines, showLineNumbers);
};

/**
 * Render unified diff
 */
const renderUnified = (diffLines: DiffLine[], showLineNumbers: boolean): string => {
	const lines: string[] = [];

	for (const line of diffLines) {
		const prefix = line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";
		const color = line.type === "added" ? GREEN : line.type === "removed" ? RED : DIM;
		const lineNum = showLineNumbers
			? `${line.oldLineNumber?.toString().padStart(3) ?? "   "}|${line.newLineNumber?.toString().padStart(3) ?? "   "}`
			: "";
		lines.push(`${DIM}${lineNum}${RESET} ${color}${prefix} ${line.content}${RESET}`);
	}

	return lines.join("\n");
};

/**
 * Render inline diff (word-level highlighting)
 */
const renderInline = (diffLines: DiffLine[], showLineNumbers: boolean): string => {
	const lines: string[] = [];

	for (const line of diffLines) {
		if (line.type === "unchanged") {
			const lineNum = showLineNumbers ? `${line.newLineNumber?.toString().padStart(3) ?? "   "} ` : "";
			lines.push(`${DIM}${lineNum}${RESET} ${line.content}`);
		} else if (line.type === "added") {
			const lineNum = showLineNumbers ? `${line.newLineNumber?.toString().padStart(3) ?? "   "} ` : "";
			lines.push(`${DIM}${lineNum}${RESET} ${GREEN}+${line.content}${RESET}`);
		} else if (line.type === "removed") {
			const lineNum = showLineNumbers ? `${line.oldLineNumber?.toString().padStart(3) ?? "   "} ` : "";
			lines.push(`${DIM}${lineNum}${RESET} ${RED}-${line.content}${RESET}`);
		}
	}

	return lines.join("\n");
};

/**
 * Render side-by-side diff
 */
const renderSideBySide = (
	diffLines: DiffLine[],
	showLineNumbers: boolean,
	width: number,
): string => {
	const lines: string[] = [];
	const halfWidth = Math.floor(width / 2);

	for (const line of diffLines) {
		if (line.type === "unchanged") {
			const oldContent = line.content.padEnd(halfWidth).slice(0, halfWidth);
			const newContent = line.content.padEnd(halfWidth).slice(0, halfWidth);
			const oldNum = showLineNumbers ? `${line.oldLineNumber?.toString().padStart(3) ?? "   "}` : "";
			const newNum = showLineNumbers ? `${line.newLineNumber?.toString().padStart(3) ?? "   "}` : "";
			lines.push(`${DIM}${oldNum} ${oldContent}${RESET} ${DIM}|${RESET} ${DIM}${newNum} ${newContent}${RESET}`);
		} else if (line.type === "added") {
			const newContent = line.content.padEnd(halfWidth).slice(0, halfWidth);
			const newNum = showLineNumbers ? `${line.newLineNumber?.toString().padStart(3) ?? "   "}` : "";
			lines.push(`${"".padEnd(halfWidth + (showLineNumbers ? 4 : 0))} ${CYAN}|${RESET} ${GREEN}${newNum} ${newContent}${RESET}`);
		} else if (line.type === "removed") {
			const oldContent = line.content.padEnd(halfWidth).slice(0, halfWidth);
			const oldNum = showLineNumbers ? `${line.oldLineNumber?.toString().padStart(3) ?? "   "}` : "";
			lines.push(`${RED}${oldNum} ${oldContent}${RESET} ${CYAN}|${RESET}`);
		}
	}

	return lines.join("\n");
};
