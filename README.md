> 🚀 Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities

# @wrikka/create-cli

Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities

![Bun](https://img.shields.io/badge/Bun-1.3.14-000000?logo=bun&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-%5E7.0.2-3178c6?logo=typescript&logoColor=white) ![Version](https://img.shields.io/badge/version-0.1.0-1976d2)


```text
┌──────────────────────────────────────┐
│             create-cli             │
│  ┌──────────────┐  ┌──────────────┐  │
│  │    Input     │  │   Process    │  │
│  └──────┬───────┘  └──────┬───────┘  │
│         │                 │          │
│         └────────┬────────┘          │
│                  ▼                   │
│  ┌────────────────────────────────┐  │
│  │           Output               │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```


## Get Started

1. **Install the package**

   Add @wrikka/create-cli to your project or install workspace dependencies.

   ```bash
   bun add @wrikka/create-cli
   ```

2. **Build the package**

   Compile the package and produce the dist output.

   ```bash
   cd packages/create-cli && bun run build
   ```

3. **Run in development**

   Start the dev/watch mode or the CLI entry point.

   ```bash
   bun run dev
   ```

4. **Verify quality**

   Run lint, type check, and tests.

   ```bash
   bun run verify
   ```

## Features

| Icon | Feature | Description | Benefit | Usage |
|:----:|:--------|:------------|:--------|:------|
| <center>![cube](https://api.iconify.design/mdi:cube.svg?color=%231976d2&width=20)</center> | Core | Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities | Reusable, type-safe | `import * as pkg from '@wrikka/create-cli'` |
| <center>![code-braces](https://api.iconify.design/mdi:code-braces.svg?color=%23388e3c&width=20)</center> | TypeScript | Full strict TypeScript support | Compile-time safety | type definitions |
| <center>![test-tube](https://api.iconify.design/mdi:test-tube.svg?color=%237b1fa2&width=20)</center> | Testing | Vitest unit and integration tests | High confidence | bun run test |


## Usage

### Usage via API

```typescript
import { autocomplete, cancel, confirm } from '@wrikka/create-cli';

const result = autocomplete({ message: '...' });
```

### Usage via SDK

Install the package:

```bash
bun add @wrikka/create-cli
```

Import and use in your project:

```typescript
import { autocomplete, cancel, confirm } from '@wrikka/create-cli';

const result = autocomplete({ message: '...' });
```

### Usage via TUI

Build an interactive TUI by importing `renderComponentUseCase`. Use `Tab` to focus, `Enter` to select, and `q` to exit the terminal UI.


## Project

<details>
<summary>Goal</summary>

| Icon | Goal | Status | Description |
|:----:|----|------|-----------|
| <center>![check-circle](https://api.iconify.design/mdi:check-circle.svg?color=%231976d2&width=20)</center> | Core functionality | In Scope | Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities |
</details>

<details>
<summary>Scope</summary>

| Icon | Scope | Status | Description |
|:----:|-----|------|-----------|
| <center>![check-circle](https://api.iconify.design/mdi:check-circle.svg?color=%231976d2&width=20)</center> | Core functionality | In Scope | Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities |
</details>

<details>
<summary>When To Use</summary>

| Icon | Use Case | Description |
|:----:|--------|-----------|
| <center>![check-circle](https://api.iconify.design/mdi:check-circle.svg?color=%231976d2&width=20)</center> | Core functionality | In Scope | Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities |
</details>

<details>
<summary>Key Concepts</summary>

| Icon | Concept | Description |
|:----:|-------|-----------|
| <center>![check-circle](https://api.iconify.design/mdi:check-circle.svg?color=%231976d2&width=20)</center> | Core functionality | In Scope | Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities |
</details>

<details>
<summary>Core Principles</summary>

| Icon | Principle | Description |
|:----:|---------|-----------|
| <center>![check-circle](https://api.iconify.design/mdi:check-circle.svg?color=%231976d2&width=20)</center> | Core functionality | In Scope | Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities |
</details>

<details>
<summary>Best Practices</summary>

| Icon | Practice | Description |
|:----:|--------|-----------|
| <center>![check-circle](https://api.iconify.design/mdi:check-circle.svg?color=%231976d2&width=20)</center> | Core functionality | In Scope | Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities |
</details>



## API References

<details>
<summary>Functions & Values</summary>

| Name | Description |
|------|-------------|
| `autocomplete` | Exported from @wrikka/create-cli |
| `cancel` | Exported from @wrikka/create-cli |
| `confirm` | Exported from @wrikka/create-cli |
| `date` | Exported from @wrikka/create-cli |
| `group` | Exported from @wrikka/create-cli |
| `groupMultiselect` | Exported from @wrikka/create-cli |
| `intro` | Exported from @wrikka/create-cli |
| `isCancel` | Exported from @wrikka/create-cli |
| `log` | Exported from @wrikka/create-cli |
| `multiselect` | Exported from @wrikka/create-cli |
| `note` | Exported from @wrikka/create-cli |
| `outro` | Exported from @wrikka/create-cli |
| `password` | Exported from @wrikka/create-cli |
| `path` | Exported from @wrikka/create-cli |
| `select` | Exported from @wrikka/create-cli |
| `selectKey` | Exported from @wrikka/create-cli |
| `showProgress` | Exported from @wrikka/create-cli |
| `spinner` | Exported from @wrikka/create-cli |
| `stream` | Exported from @wrikka/create-cli |
| `taskLog` | Exported from @wrikka/create-cli |
| `text` | Exported from @wrikka/create-cli |
| `number` | Exported from @wrikka/create-cli |
| `editor` | Exported from @wrikka/create-cli |
| `search` | Exported from @wrikka/create-cli |
| `asyncSelect` | Exported from @wrikka/create-cli |
| `composeAsyncValidationHooks` | Exported from @wrikka/create-cli |
| `composeValidationHooks` | Exported from @wrikka/create-cli |
| `createAsyncValidationHook` | Exported from @wrikka/create-cli |
| `createValidationHook` | Exported from @wrikka/create-cli |
| `emailHook` | Exported from @wrikka/create-cli |
| `integerHook` | Exported from @wrikka/create-cli |
| `maxLengthHook` | Exported from @wrikka/create-cli |
| `minLengthHook` | Exported from @wrikka/create-cli |
| `numberHook` | Exported from @wrikka/create-cli |
| `patternHook` | Exported from @wrikka/create-cli |
| `rangeHook` | Exported from @wrikka/create-cli |
| `requiredHook` | Exported from @wrikka/create-cli |
| `runAsyncValidation` | Exported from @wrikka/create-cli |
| `runValidation` | Exported from @wrikka/create-cli |
| `urlHook` | Exported from @wrikka/create-cli |
</details>

<details>
<summary>Types</summary>

| Name | Description |
|------|-------------|
| `NumberPromptOptions` | Type exported from @wrikka/create-cli |
| `EditorPromptOptions` | Type exported from @wrikka/create-cli |
| `SearchPromptOptions` | Type exported from @wrikka/create-cli |
| `AsyncPromptOptions` | Type exported from @wrikka/create-cli |
| `AsyncValidateFunction` | Type exported from @wrikka/create-cli |
| `ValidateFunction` | Type exported from @wrikka/create-cli |
| `ValidationResult` | Type exported from @wrikka/create-cli |
| `BorderCharacter` | Type exported from @wrikka/create-cli |
| `BorderStyle` | Type exported from @wrikka/create-cli |
| `BoxOptions` | Type exported from @wrikka/create-cli |
| `BoxRender` | Type exported from @wrikka/create-cli |
| `ChartData` | Type exported from @wrikka/create-cli |
| `ChartOptions` | Type exported from @wrikka/create-cli |
| `ChartRender` | Type exported from @wrikka/create-cli |
| `ChartType` | Type exported from @wrikka/create-cli |
| `ColorFormat` | Type exported from @wrikka/create-cli |
| `ColorPalette` | Type exported from @wrikka/create-cli |
| `MarkdownElement` | Type exported from @wrikka/create-cli |
| `MarkdownOptions` | Type exported from @wrikka/create-cli |
| `MarkdownRender` | Type exported from @wrikka/create-cli |
| `MarkdownStyle` | Type exported from @wrikka/create-cli |
| `ProgressBarOptions` | Type exported from @wrikka/create-cli |
| `ProgressRender` | Type exported from @wrikka/create-cli |
| `ProgressState` | Type exported from @wrikka/create-cli |
| `SpinnerOptions` | Type exported from @wrikka/create-cli |
| `SpinnerRender` | Type exported from @wrikka/create-cli |
| `SpinnerState` | Type exported from @wrikka/create-cli |
| `TUIBoxProps` | Type exported from @wrikka/create-cli |
| `TUIFlexProps` | Type exported from @wrikka/create-cli |
| `TUITextProps` | Type exported from @wrikka/create-cli |
| `Component` | Type exported from @wrikka/create-cli |
| `ComponentChildren` | Type exported from @wrikka/create-cli |
| `ComponentFunction` | Type exported from @wrikka/create-cli |
| `ComponentProps` | Type exported from @wrikka/create-cli |
| `ComponentType` | Type exported from @wrikka/create-cli |
| `RenderContext` | Type exported from @wrikka/create-cli |
| `RenderFunction` | Type exported from @wrikka/create-cli |
| `RenderOutput` | Type exported from @wrikka/create-cli |
| `Signal` | Type exported from @wrikka/create-cli |
| `IInputPort` | Type exported from @wrikka/create-cli |
</details>



## Development

<details>
<summary>Tech Stack</summary>

| Layer | Technology | Version | Description |
|:------|:-----------|:--------|:------------|
| Runtime | Bun | >= 1.3.10 | JavaScript runtime and package manager |
| Language | TypeScript | 7.0.2 | Type-safe development with strict mode |
| Build | bunup | ^0.16.32 | Bundling and distribution build |
| Testing | Vitest | ^4.1.10 | Unit and integration testing |
| Linting | Biome | ^2.5.8 | Code linting and formatting |
</details>

<details>
<summary>How It Work</summary>

```text
Input -> create-cli -> Output
```

</details>

<details>
<summary>Architecture</summary>

```text
└── src
    ├── adapters
    │   ├── box
    │   │   └── box-handler.ts
    │   ├── charts
    │   │   └── charts-handler.ts
    │   ├── config
    │   │   ├── index.ts # public API
    │   │   └── terminal-config.ts
    │   ├── console
    │   │   ├── index.ts # public API
    │   │   └── operations.ts
    │   ├── database
    │   │   ├── database-config.ts
    │   │   └── index.ts # public API
    │   ├── input
    │   │   └── cli
    │   │       └── prompt-adapter.ts
    │   ├── markdown
    │   │   └── markdown-handler.ts
    │   ├── progress
    │   │   └── progress-handler.ts
    │   ├── prompt
    │   │   └── prompt-handler.ts
    │   ├── spinner
    │   │   └── spinner-handler.ts
    │   ├── terminal
    │   │   ├── bun-terminal.adapter.ts
    │   │   ├── index.ts # public API
    │   │   └── terminal-operations.ts
    │   └── timer
    │       ├── index.ts # public API
    │       └── timer-operations.ts
    ├── index.ts # public API
    ├── modules
    │   ├── box
    │   │   ├── application
    │   │   │   └── index.ts # public API
    │   │   ├── domain
    │   │   │   ├── events
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── index.ts # public API
    │   │   │   ├── models
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── operations.ts
    │   │   │   └── validators
    │   │   │       └── index.ts # public API
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   └── index.ts # public API
    │   │   └── types
    │   │       └── index.ts # public API
    │   ├── charts
    │   │   ├── application
    │   │   │   └── index.ts # public API
    │   │   ├── domain
    │   │   │   ├── events
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── index.ts # public API
    │   │   │   ├── models
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── operations.ts
    │   │   │   └── validators
    │   │   │       └── index.ts # public API
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   └── index.ts # public API
    │   │   └── types
    │   │       └── index.ts # public API
    │   ├── cli
    │   │   ├── command.ts
    │   │   ├── completion.ts
    │   │   ├── help.ts
    │   │   ├── parser.ts
    │   │   └── subcommand.ts
    │   ├── color
    │   │   ├── application
    │   │   │   └── index.ts # public API
    │   │   ├── domain
    │   │   │   ├── colors-object.ts
    │   │   │   ├── events
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── index.ts # public API
    │   │   │   ├── models
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── operations.ts
    │   │   │   └── validators
    │   │   │       ├── color.ts
    │   │   │       └── index.ts # public API
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   └── index.ts # public API
    │   │   └── types
    │   │       └── index.ts # public API
    │   ├── display
    │   │   ├── diff.ts
    │   │   ├── json.ts
    │   │   ├── keyvalue.ts
    │   │   ├── list.ts
    │   │   ├── table.ts
    │   │   └── tree.ts
    │   ├── gradient
    │   │   └── index.ts # public API
    │   ├── markdown
    │   │   ├── application
    │   │   │   └── index.ts # public API
    │   │   ├── domain
    │   │   │   ├── events
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── index.ts # public API
    │   │   │   ├── models
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── operations.ts
    │   │   │   └── validators
    │   │   │       └── index.ts # public API
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   └── index.ts # public API
    │   │   └── types
    │   │       └── index.ts # public API
    │   ├── powerline
    │   │   └── index.ts # public API
    │   ├── progress
    │   │   ├── application
    │   │   │   └── index.ts # public API
    │   │   ├── domain
    │   │   │   ├── events
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── index.ts # public API
    │   │   │   ├── models
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── operations.ts
    │   │   │   └── validators
    │   │   │       ├── index.ts # public API
    │   │   │       └── progress.ts
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   └── index.ts # public API
    │   │   └── types
    │   │       └── index.ts # public API
    │   ├── prompt
    │   │   ├── application
    │   │   │   └── usecases
    │   │   │       ├── async-prompt.usecase.ts
    │   │   │       ├── autocomplete.usecase.ts
    │   │   │       ├── date.usecase.ts
    │   │   │       ├── editor-prompt.usecase.ts
    │   │   │       ├── group-multiselect.usecase.ts
    │   │   │       ├── index.ts # public API
    │   │   │       ├── multiselect.usecase.ts
    │   │   │       ├── number-prompt.usecase.ts
    │   │   │       ├── path.usecase.ts
    │   │   │       ├── progress.usecase.ts
    │   │   │       ├── search-prompt.usecase.ts
    │   │   │       ├── select-key.usecase.ts
    │   │   │       ├── select-prompt.usecase.ts
    │   │   │       ├── spinner.usecase.ts
    │   │   │       └── text-prompt.usecase.ts
    │   │   ├── domain
    │   │   │   ├── events
    │   │   │   │   ├── index.ts # public API
    │   │   │   │   └── prompt-events.ts
    │   │   │   ├── models
    │   │   │   │   ├── autocomplete-model.ts
    │   │   │   │   ├── date-model.ts
    │   │   │   │   ├── index.ts # public API
    │   │   │   │   ├── path-model.ts
    │   │   │   │   ├── progress-model.ts
    │   │   │   │   ├── prompt-model.ts
    │   │   │   │   └── spinner-model.ts
    │   │   │   ├── operations
    │   │   │   │   ├── index.ts # public API
    │   │   │   │   ├── selection.ts
    │   │   │   │   ├── validation-hooks.ts
    │   │   │   │   └── validation.ts
    │   │   │   └── validators
    │   │   │       └── index.ts # public API
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   ├── index.ts # public API
    │   │   │   └── terminal-port.ts
    │   │   └── types
    │   │       ├── index.ts # public API
    │   │       └── prompt.ts
    │   ├── spinner
    │   │   ├── application
    │   │   │   └── index.ts # public API
    │   │   ├── domain
    │   │   │   ├── events
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── index.ts # public API
    │   │   │   ├── models
    │   │   │   │   └── index.ts # public API
    │   │   │   ├── operations.ts
    │   │   │   └── validators
    │   │   │       ├── index.ts # public API
    │   │   │       └── spinner.ts
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   └── index.ts # public API
    │   │   └── types
    │   │       └── index.ts # public API
    │   ├── theme
    │   │   └── index.ts # public API
    │   ├── tui-components
    │   │   ├── application
    │   │   │   └── index.ts # public API
    │   │   ├── domain
    │   │   │   ├── box.operations.ts
    │   │   │   ├── flex.operations.ts
    │   │   │   ├── index.ts # public API
    │   │   │   └── text.operations.ts
    │   │   ├── index.ts # public API
    │   │   ├── ports
    │   │   │   └── index.ts # public API
    │   │   └── types
    │   │       └── index.ts # public API
    │   └── tui-core
    │       ├── application
    │       │   ├── index.ts # public API
    │       │   └── usecases
    │       │       └── render.usecase.ts
    │       ├── domain
    │       │   ├── index.ts # public API
    │       │   ├── operations.ts
    │       │   └── types.ts
    │       ├── index.ts # public API
    │       ├── ports
    │       │   ├── index.ts # public API
    │       │   └── terminal.port.ts
    │       └── types
    │           └── index.ts # public API
    ├── presentation
    │   ├── cli
    │   │   ├── demo.ts
    │   │   ├── group.ts
    │   │   ├── index.ts # public API
    │   │   ├── output.ts
    │   │   ├── progress.ts
    │   │   ├── prompt-api.ts
    │   │   ├── prompt-functions.ts
    │   │   ├── session.ts
    │   │   └── stream.ts
    │   ├── components
    │   │   ├── box.ts
    │   │   ├── flex.ts
    │   │   ├── index.ts # public API
    │   │   └── text.ts
    │   ├── events
    │   │   └── index.ts # public API
    │   ├── http
    │   │   └── index.ts # public API
    │   ├── index.ts # public API
    │   └── renderer.ts
    └── shared
        ├── constants
        │   ├── box.ts
        │   ├── charts.ts
        │   ├── color.ts
        │   ├── index.ts # public API
        │   ├── progress.ts
        │   ├── spinner-state.ts
        │   └── spinner.ts
        ├── errors
        │   ├── constructors.ts
        │   ├── converter.ts
        │   ├── error-types.ts
        │   ├── factories.ts
        │   ├── guards.ts
        │   ├── index.ts # public API
        │   └── types.ts
        ├── index.ts # public API
        ├── types
        │   ├── color.ts
        │   ├── either.ts
        │   ├── factories.ts
        │   ├── index.ts # public API
        │   ├── layout.ts
        │   ├── option.ts
        │   ├── progress.ts
        │   ├── result.ts
        │   └── spinner.ts
        └── utils
            ├── common.ts
            ├── functional.ts
            ├── functions.ts
            ├── hooks.ts
            ├── index.ts # public API
            ├── prompts.ts
            └── string.ts
```

</details>

<details>
<summary>Scripts</summary>

```json
{
  "dev": "bun run src/index.ts", // dev
  "build": "bunup", // build
  "build:watch": "bunup --watch", // build:watch
  "typecheck": "tsgo --noEmit", // typecheck
  "typecheck:watch": "tsgo --noEmit --watch", // typecheck:watch
  "lint": "biome check", // lint
  "lint:fix": "biome check --write", // lint:fix
  "format": "biome check --write", // format
  "test": "vitest run", // test
  "test:watch": "vitest", // test:watch
  "test:coverage": "vitest run --coverage", // test:coverage
  "scan": "ast-grep scan", // scan
  "check": "bun run lint && bun run typecheck && bun run scan", // check
  "verify": "bun run check && bun run test && bun run build", // verify
  "deps:analyze": "bunx depcheck", // deps:analyze
  "clean": "bunx rimraf dist node_modules", // clean
  "security": "bunx audit" // security
}
```

</details>

<details>
<summary>Workflows</summary>

```text
.github/
├── workflows/     # CI/CD pipelines
.moon/
├── tasks.yml      # Moonrepo task definitions
turbo.json         # Turborepo pipeline
```

</details>

<details>
<summary>Skills</summary>

```text
Clean Architecture     # Layered, testable design
TypeScript             # Strict type safety
Bun                    # Fast runtime and package manager
Vitest                 # Unit and integration testing
Biome                  # Linting and formatting
```

</details>
