/**
 * List renderer - renders ordered, unordered, and definition lists
 */

const RESET = "\x1b[0m";

export type ListType = "ordered" | "unordered" | "definition";

export interface ListItem {
	/** Item text */
	text: string;
	/** For definition lists: the term */
	term?: string;
	/** Custom color (ANSI code) */
	color?: string;
	/** Nested sub-items */
	children?: ListItem[];
}

export interface ListOptions {
	/** List type */
	type?: ListType;
	/** Starting number for ordered lists */
	start?: number;
	/** Bullet character for unordered lists */
	bullet?: string;
	/** Indent size */
	indent?: string;
	/** Color for the bullet/number */
	markerColor?: string;
}

/**
 * Render a list (ordered, unordered, or definition)
 */
export const renderList = (
	items: readonly ListItem[],
	options?: ListOptions,
): string => {
	const type = options?.type ?? "unordered";
	const start = options?.start ?? 1;
	const bullet = options?.bullet ?? "•";
	const indent = options?.indent ?? "  ";
	const markerColor = options?.markerColor ?? "\x1b[36m";
	const lines: string[] = [];

	const renderItems = (
		itemsList: readonly ListItem[],
		level: number,
		counter: number,
	): void => {
		for (let i = 0; i < itemsList.length; i++) {
			const item = itemsList[i]!;
			const prefix = indent.repeat(level);
			const colored = item.color
				? `${item.color}${item.text}${RESET}`
				: item.text;

			if (type === "ordered") {
				lines.push(`${prefix}${markerColor}${counter + i}.${RESET} ${colored}`);
			} else if (type === "definition") {
				if (item.term) {
					lines.push(`${prefix}${markerColor}${item.term}${RESET}`);
				}
				lines.push(`${prefix}${indent}${colored}`);
			} else {
				lines.push(`${prefix}${markerColor}${bullet}${RESET} ${colored}`);
			}

			if (item.children && item.children.length > 0) {
				renderItems(item.children, level + 1, 1);
			}
		}
	};

	renderItems(items, 0, start);
	return lines.join("\n");
};

/**
 * Render a definition list (term + description pairs)
 */
export const renderDefinitionList = (
	items: readonly { term: string; description: string; color?: string }[],
	options?: { indent?: string; termColor?: string },
): string => {
	const indent = options?.indent ?? "  ";
	const termColor = options?.termColor ?? "\x1b[1m";
	const lines: string[] = [];

	for (const item of items) {
		lines.push(`${termColor}${item.term}${RESET}`);
		const colored = item.color
			? `${item.color}${item.description}${RESET}`
			: item.description;
		lines.push(`${indent}${colored}`);
	}

	return lines.join("\n");
};
