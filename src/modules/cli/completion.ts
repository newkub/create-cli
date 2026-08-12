/**
 * Shell completion generation - generates completion scripts for bash, zsh, and fish
 */

import type { Command } from "./command";

export type CompletionShell = "bash" | "zsh" | "fish";

/**
 * Generate a shell completion script for a command
 */
export const generateCompletion = (
	command: Command,
	shell: CompletionShell = "bash",
): string => {
	switch (shell) {
		case "bash":
			return generateBashCompletion(command);
		case "zsh":
			return generateZshCompletion(command);
		case "fish":
			return generateFishCompletion(command);
		default:
			return generateBashCompletion(command);
	}
};

/**
 * Generate bash completion script
 */
const generateBashCompletion = (command: Command): string => {
	const name = command.name;
	const subcommands = command.getSubcommands();
	const options = command.getOptions();

	const lines: string[] = [
		`# Bash completion for ${name}`,
		`_${name}_completion() {`,
		`    local cur prev words cword`,
		`    _init_completion || return`,
		"",
		`    local subcommands="${subcommands.map((s) => s.name).join(" ")}"`,
		`    local options="${options.map((o) => `--${o.name}`).join(" ")}"`,
		"",
		`    # Complete subcommands`,
		`    if [[ $cword -eq 1 ]]; then`,
		`        COMPREPLY=($(compgen -W "$subcommands" -- "$cur"))`,
		`        return 0`,
		`    fi`,
		"",
		`    # Complete options`,
		`    if [[ "$cur" == --* ]]; then`,
		`        COMPREPLY=($(compgen -W "$options" -- "$cur"))`,
		`        return 0`,
		`    fi`,
		"",
		`    return 0`,
		`}`,
		`complete -F _${name}_completion ${name}`,
	];

	return lines.join("\n");
};

/**
 * Generate zsh completion script
 */
const generateZshCompletion = (command: Command): string => {
	const name = command.name;
	const subcommands = command.getSubcommands();
	const options = command.getOptions();

	const subcmdLines = subcommands
		.map((s) => `        '${s.name}:${s.description.replace(/'/g, "'\\''")}'`)
		.join("\n");

	const optionLines = options
		.map((o) => {
			const desc = o.description.replace(/'/g, "'\\''");
			return `        '--${o.name}[${desc}]'`;
		})
		.join("\n");

	const lines: string[] = [
		`#compdef ${name}`,
		`# Zsh completion for ${name}`,
		"",
		`_${name}() {`,
		`    local -a subcommands options`,
		"",
		`    subcommands=(`,
		subcmdLines || "        # No subcommands",
		`    )`,
		"",
		`    options=(`,
		optionLines || "        # No options",
		`    )`,
		"",
		`    _arguments -C \\`,
		`        '1: :->subcommands' \\`,
		`        '*: :->args'`,
		"",
		`    case $state in`,
		`        subcommands)`,
		`            _describe 'command' subcommands`,
		`            ;;`,
		`        args)`,
		`            _arguments -s $options`,
		`            ;;`,
		`    esac`,
		`}`,
		"",
		`_${name} "$@"`,
	];

	return lines.join("\n");
};

/**
 * Generate fish completion script
 */
const generateFishCompletion = (command: Command): string => {
	const name = command.name;
	const subcommands = command.getSubcommands();
	const options = command.getOptions();

	const lines: string[] = [
		`# Fish completion for ${name}`,
		"",
	];

	// Subcommand completions
	for (const sub of subcommands) {
		lines.push(
			`complete -c ${name} -f -n '__fish_use_subcommand' -a '${sub.name}' -d '${sub.description.replace(/'/g, "\\'")}'`,
		);
	}

	// Option completions
	for (const opt of options) {
		const shortPart = opt.short ? `-s ${opt.short}` : "";
		const valuePart = opt.takesValue ? "-r" : "";
		lines.push(
			`complete -c ${name} -f -n '__fish_use_subcommand' ${shortPart} -l ${opt.name} ${valuePart} -d '${opt.description.replace(/'/g, "\\'")}'`,
		);
	}

	return lines.join("\n");
};
