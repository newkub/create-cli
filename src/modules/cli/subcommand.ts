/**
 * Subcommand support - allows commands to have nested subcommands
 */

import { Command } from "./command";

export interface SubcommandConfig {
	name: string;
	description: string;
	aliases?: string[];
	hidden?: boolean;
}

/**
 * Subcommand class - extends Command with subcommand-specific features
 */
export class Subcommand extends Command {
	aliases: string[] = [];
	hidden: boolean = false;

	constructor(config: SubcommandConfig) {
		super(config.name, config.description);
		if (config.aliases) this.aliases = config.aliases;
		if (config.hidden) this.hidden = config.hidden;
	}

	/**
	 * Add an alias for this subcommand
	 */
	alias(alias: string): this {
		this.aliases.push(alias);
		return this;
	}

	/**
	 * Hide this subcommand from help output
	 */
	hide(): this {
		this.hidden = true;
		return this;
	}

	/**
	 * Check if this subcommand matches a name or alias
	 */
	matches(name: string): boolean {
		return this.name === name || this.aliases.includes(name);
	}
}

/**
 * Create a subcommand from a configuration object
 */
export const createSubcommand = (config: SubcommandConfig): Subcommand => {
	return new Subcommand(config);
};

/**
 * Register a subcommand on a parent command with aliases
 */
export const registerSubcommand = (
	parent: Command,
	subcommand: Subcommand,
): Command => {
	parent.subcommand(subcommand);

	// Register aliases - we need to handle this at the Command level
	// Since Command.subcommand uses a Map keyed by name, we need to
	// also register aliases by modifying the parent's subcommand map
	for (const alias of subcommand.aliases) {
		// Access the internal subcommands map via the findSubcommand method
		// We'll add alias support by extending the parent
		(parent as unknown as { subcommands: Map<string, Command> }).subcommands.set(
			alias,
			subcommand,
		);
	}

	return parent;
};
