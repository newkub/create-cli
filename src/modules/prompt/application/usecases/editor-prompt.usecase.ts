/**
 * Editor prompt use case - opens $EDITOR for multi-line input
 * Uses Bun.spawn to launch the user's preferred editor
 */

import type { Result } from "#shared/types";
import type { ITerminalPort } from "../../ports";

export interface EditorPromptOptions {
	message: string;
	defaultValue?: string;
	editor?: string;
	fileExtension?: string;
	validate?: (value: string) => string | undefined;
}

const getEditor = (custom?: string): string => {
	if (custom) return custom;
	const envEditor = process.env.EDITOR || process.env.VISUAL;
	if (envEditor) return envEditor;
	return "vi";
};

const parseEditorCommand = (
	editor: string,
): { cmd: string; args: string[] } => {
	const parts = editor.split(/\s+/);
	return { cmd: parts[0] ?? "vi", args: parts.slice(1) };
};

export const editorPrompt = async (
	options: EditorPromptOptions,
	terminal: ITerminalPort,
): Promise<Result<string, Error>> => {
	const editor = getEditor(options.editor);
	const ext = options.fileExtension ?? ".md";

	// Write initial message
	await terminal.write(`${options.message}\n`);
	await terminal.write(`Opening ${editor}...\n`);

	// Create temp file using Bun
	const tmpDir = process.env.TMPDIR || process.env.TMP || "/tmp";
	const tmpFile = `${tmpDir}/create-cli-editor-${Date.now()}${ext}`;

	// Write default content to temp file
	await Bun.write(tmpFile, options.defaultValue ?? "");

	try {
		const { cmd, args } = parseEditorCommand(editor);
		const fullArgs = [...args, tmpFile];

		const proc = Bun.spawn([cmd, ...fullArgs], {
			stdin: "inherit",
			stdout: "inherit",
			stderr: "inherit",
		});

		const exitCode = await proc.exited;

		if (exitCode !== 0) {
			return {
				success: false,
				error: new Error(`Editor exited with code ${exitCode}`),
			};
		}

		// Read content back
		const content = await Bun.file(tmpFile).text();

		// Clean up temp file
		await Bun.file(tmpFile).delete();

		// Validate
		if (options.validate) {
			const customError = options.validate(content);
			if (customError) {
				return { success: false, error: new Error(customError) };
			}
		}

		await terminal.write("\r");
		await terminal.clear();

		return { success: true, data: content };
	} catch (error) {
		// Clean up temp file on error
		try {
			await Bun.file(tmpFile).delete();
		} catch {
			// Ignore cleanup errors
		}

		return {
			success: false,
			error: error instanceof Error ? error : new Error(String(error)),
		};
	}
};
