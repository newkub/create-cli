/**
 * Box constants - pure data
 */

// Box drawing characters
export const BOX_CHARS: Record<
	"single" | "double" | "rounded",
	{
		topLeft: string;
		topRight: string;
		bottomLeft: string;
		bottomRight: string;
		horizontal: string;
		vertical: string;
	}
> = {
	single: {
		topLeft: "\u250c",
		topRight: "\u2510",
		bottomLeft: "\u2514",
		bottomRight: "\u2518",
		horizontal: "\u2500",
		vertical: "\u2502",
	},
	double: {
		topLeft: "\u2554",
		topRight: "\u2557",
		bottomLeft: "\u255a",
		bottomRight: "\u255d",
		horizontal: "\u2550",
		vertical: "\u2551",
	},
	rounded: {
		topLeft: "\u255d",
		topRight: "\u255e",
		bottomLeft: "\u255f",
		bottomRight: "\u2560",
		horizontal: "\u2500",
		vertical: "\u2502",
	},
} as const;

// Export as BOX_CONSTANTS for backward compatibility
export const BOX_CONSTANTS = BOX_CHARS;
