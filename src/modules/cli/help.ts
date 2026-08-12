/**
 * Help text generator - auto-generates help from command definitions
 */

import type { Command } from "./command";

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";

/**
 * Generate help text for a command
 */
export const generateHelp = (command: Command): string => {
	const lines: string[] = [];
	const name = getFullCommandName(command);

	// Usage line
	lines.push(`${BOLD}Usage:${RESET} ${name} ${DIM}[options]${RESET}`);

	// Add arguments to usage
	const args = command.getArguments();
	if (args.length > 0) {
		const argStr = args
			.map((arg) => {
				if (arg.variadic) {
					return arg.required ? `<${arg.name}...>` : `[${arg.name}...]`;
				}
				return arg.required ? `<${arg.name}>` : `[${arg.name}]`;
			})
			.join(" ");
		lines.push(`       ${name} ${argStr} ${DIM}[options]${RESET}`);
	}

	// Add subcommands to usage
	const subcommands = command.getSubcommands();
	if (subcommands.length > 0) {
		lines.push(`       ${name} ${DIM}<command>${RESET} ${DIM}[options]${RESET}`);
	}

	lines.push("");

	// Description
	if (command.description) {
		lines.push(`${BOLD}Description:${RESET} ${command.description}`);
		lines.push("");
	}

	// Arguments section
	if (args.length > 0) {
		lines.push(`${BOLD}Arguments:${RESET}`);
		for (const arg of args) {
			const argDisplay = arg.variadic
				? `<${arg.name}...>`
				: `<${arg.name}>`;
			lines.push(`  ${CYAN}${argDisplay}${RESET}  ${arg.description}`);
		}
		lines.push("");
	}

	// Options section
	const options = command.getOptions();
	lines.push(`${BOLD}Options:${RESET}`);
	for (const opt of options) {
		const shortPart = opt.short ? `-${opt.short}, ` : "    ";
		const valuePart = opt.takesValue ? ` <value>` : "";
		const defaultPart = opt.defaultValue
			? ` ${DIM}(default: ${opt.defaultValue})${RESET}`
			: "";
		lines.push(
			`  ${shortPart}--${opt.name}${valuePart}  ${opt.description}${defaultPart}`,
		);
	}
	// Always show help
	lines.push(`  ${DIM}-h, --help${RESET}     Show this help message`);
	if (command.getVersion()) {
		lines.push(`  ${DIM}-V, --version${RESET}  Show version number`);
	}
	lines.push("");

	// Subcommands section
	if (subcommands.length > 0) {
		lines.push(`${BOLD}Commands:${RESET}`);
		for (const subcmd of subcommands) {
			lines.push(`  ${GREEN}${subcmd.name}${RESET}  ${subcmd.description}`);
		}
		lines.push("");
	}

	return lines.join("\n");
};

/**
 * Get the full command name including parent names
 */
const getFullCommandName = (command: Command): string => {
	const parts: string[] = [];
	let current: Command | undefined = command;
	while (current) {
		parts.unshift(current.name);
		current = current.getParent();
	}
	return parts.join(" ");
};

/**
 * Generate a brief one-line description for shell completion
 */
export const generateShortHelp = (command: Command): string => {
	return command.description || command.name;
};
