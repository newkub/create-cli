# @wrikka/create-cli

Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities for building CLI applications with Bun.

Merged from `@wrikka/prompt`, `@wrikka/terminal-ui`, and `@wrikka/tui` into a single package.

## Features

### Prompts
- **Text, Select, Confirm, Multiselect, Autocomplete, Date, Path, Password** - backward compatible with `@wrikka/prompt` API
- **Number** - numeric input with min/max/step validation
- **Editor** - opens `$EDITOR` for multi-line input
- **Search** - fuzzy search/filter through options
- **Async** - async loading state while fetching options
- **Validation Hooks** - composable validation system with built-in validators

### Terminal UI
- **Colors** - functional color interface with semantic colors
- **Box** - terminal boxes with borders and styles
- **Charts** - bar, pie, and line charts
- **Progress** - progress bars with multi-segment support
- **Spinner** - loading indicators with customizable frames
- **Markdown** - markdown rendering with syntax highlighting (via shiki)

### Visual Features
- **Theme** - preset themes (dark, light, dracula, solarized)
- **Gradient** - gradient text colors with truecolor interpolation
- **Powerline** - powerline-style status bars with patched font symbols

### TUI Framework
- **Component-based** - similar to ink but using Bun native APIs
- **Clean Architecture** - Domain, Application, Ports layers
- **Pure Functions** - 100% functional domain logic
- **Type-safe** - full TypeScript support with Signal types

### CLI Framework
- **Command** - command definitions with options and arguments
- **Parser** - argument parser (positional, --flags, -short, --flag=value)
- **Subcommand** - nested subcommand support with aliases
- **Help** - auto-generated help text from command definitions
- **Completion** - shell completion generation (bash, zsh, fish)

### Data Display
- **Table** - tables with column alignment, borders, colors
- **Tree** - hierarchical tree structures
- **List** - ordered, unordered, and definition lists
- **KeyValue** - key-value pair formatting
- **Diff** - side-by-side or inline diffs
- **JSON** - pretty-print JSON with syntax highlighting

## Installation

```bash
bun add @wrikka/create-cli
```

## Usage

### Prompts

```typescript
import { text, select, confirm, number, editor, search } from "@wrikka/create-cli";

const name = await text({ message: "What's your name?" });
const age = await number({ message: "Age?", min: 0, max: 150 });
const color = await select({
  message: "Pick a color",
  options: [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" }
  ]
});
```

### Validation Hooks

```typescript
import { composeValidationHooks, requiredHook, emailHook } from "@wrikka/create-cli";

const validate = composeValidationHooks(requiredHook, emailHook);
const email = await text({
  message: "Email?",
  validate
});
```

### Theme

```typescript
import { setTheme, applyTheme, draculaTheme } from "@wrikka/create-cli";

setTheme("dracula");
const styled = applyTheme("Hello", "primary");
```

### Gradient

```typescript
import { gradient, rainbow, presetGradients } from "@wrikka/create-cli";

console.log(gradient("Hello World", presetGradients.fire));
console.log(rainbow("Colorful text"));
```

### CLI Framework

```typescript
import { Command } from "@wrikka/create-cli";

const cmd = new Command("myapp", "A sample CLI app")
  .option({ name: "verbose", short: "v", description: "Verbose output" })
  .arg({ name: "input", description: "Input file", required: true })
  .action((args) => {
    console.log("Input:", args.positionals[0]);
    console.log("Verbose:", args.flags.has("verbose"));
  });

await cmd.run();
```

### Data Display

```typescript
import { renderTable, renderTree, renderJson, renderDiff } from "@wrikka/create-cli";

console.log(renderTable({
  columns: [
    { header: "Name", align: "left" },
    { header: "Status", align: "center" }
  ],
  rows: [
    { Name: "File 1", Status: "✓" },
    { Name: "File 2", Status: "✗" }
  ]
}));

console.log(renderJson({ data: { hello: "world" } }));
```

## Architecture

This package follows **Clean Architecture** with Functional Programming:

- **Domain Layer** (`modules/*/domain/`): Pure business logic, types, and entities
- **Application Layer** (`modules/*/application/`): Use cases and orchestration
- **Ports Layer** (`modules/*/ports/`): Interface definitions
- **Adapters Layer** (`adapters/`): I/O adapters (Bun native APIs)
- **Presentation Layer** (`presentation/`): Entry points and UI rendering
- **Shared Kernel** (`shared/`): Common types, utilities, and constants

## License

MIT
