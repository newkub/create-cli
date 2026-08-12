/**
 * Tree renderer - renders hierarchical tree structures
 */

export interface TreeNode {
	/** Node label */
	label: string;
	/** Child nodes */
	children?: TreeNode[];
	/** Custom color (ANSI code) */
	color?: string;
	/** Whether this node is the last child */
	isLast?: boolean;
}

const RESET = "\x1b[0m";

/**
 * Render a tree structure from a root node
 */
export const renderTree = (
	root: TreeNode,
	options?: { indent?: string; showRoot?: boolean },
): string => {
	const indent = options?.indent ?? "    ";
	const showRoot = options?.showRoot ?? true;
	const lines: string[] = [];

	const renderNode = (
		node: TreeNode,
		prefix: string,
		isLast: boolean,
		isRoot: boolean,
	): void => {
		// Render current node
		if (isRoot && showRoot) {
			const colored = node.color ? `${node.color}${node.label}${RESET}` : node.label;
			lines.push(colored);
		} else if (!isRoot) {
			const connector = isLast ? "└── " : "├── ";
			const colored = node.color ? `${node.color}${node.label}${RESET}` : node.label;
			lines.push(`${prefix}${connector}${colored}`);
		}

		// Render children
		if (node.children && node.children.length > 0) {
			const childPrefix = isRoot && showRoot ? "" : prefix + (isLast ? indent : "│   ");
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i]!;
				const childIsLast = i === node.children.length - 1;
				renderNode(child, childPrefix, childIsLast, false);
			}
		}
	};

	renderNode(root, "", true, true);
	return lines.join("\n");
};

/**
 * Create a tree node
 */
export const createTreeNode = (
	label: string,
	children?: TreeNode[],
	color?: string,
): TreeNode => ({
	label,
	children,
	color,
});
