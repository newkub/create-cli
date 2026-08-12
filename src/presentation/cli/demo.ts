/**
 * TUI Framework Demo
 * Demonstrates the reactive TUI framework with Clean Architecture
 */

import { renderBox } from "#modules/tui-components/domain/box.operations";
import { renderFlex } from "#modules/tui-components/domain/flex.operations";
import { renderText } from "#modules/tui-components/domain/text.operations";

function main() {
	console.log("=== TUI Framework Demo ===\n");

	// Demo Box component
	const boxOutput = renderBox(
		{ width: 40, height: 6, borderStyle: "rounded", padding: 1 },
		"Hello from TUI Framework!",
	);
	console.log(boxOutput);
	console.log();

	// Demo Text component
	const textOutput = renderText({ bold: true, color: "green" }, "Success!");
	console.log(textOutput);
	console.log();

	// Demo Flex component
	const flexOutput = renderFlex(
		{ flexDirection: "row", gap: 2, padding: 1 },
		"Item1 Item2 Item3",
	);
	console.log(flexOutput);
	console.log();

	console.log("--- Architecture ---");
	console.log(
		"modules/tui-core/ - Core framework (domain, application, ports)",
	);
	console.log("modules/tui-components/ - UI components (domain logic)");
	console.log("Built with: Bun + Clean Architecture");
}

main();
