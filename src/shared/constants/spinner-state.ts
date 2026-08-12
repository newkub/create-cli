/**
 * Spinner state constants - pure data
 */

// State transition matrix
export const VALID_TRANSITIONS: Record<
	"running" | "success" | "error" | "warning" | "info" | "stopped",
	("running" | "success" | "error" | "warning" | "info" | "stopped")[]
> = {
	running: ["success", "error", "warning", "info", "stopped"],
	success: ["running"],
	error: ["running"],
	warning: ["running"],
	info: ["running"],
	stopped: ["running"],
} as const;

// State messages
export const STATE_MESSAGES: Record<
	"running" | "success" | "error" | "warning" | "info" | "stopped",
	{ icon: string; text: string }
> = {
	success: { icon: "!", text: "Done" },
	error: { icon: "×", text: "Error" },
	warning: { icon: "!", text: "Warning" },
	info: { icon: "i", text: "Info" },
	stopped: { icon: "×", text: "Stopped" },
	running: { icon: "", text: "Running" },
} as const;

// Export as SPINNER_STATE_CONSTANTS for backward compatibility
export const SPINNER_STATE_CONSTANTS = {
	VALID_TRANSITIONS,
	STATE_MESSAGES,
};
