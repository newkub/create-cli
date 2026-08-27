> ![Status](https://img.shields.io/badge/status-in_development-red)

# @wrikka/create-cli

Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities — Build interactive CLI applications with prompts, boxes, charts, spinners, progress bars, themes, gradients, and data display components.

![Bun](https://img.shields.io/badge/Bun-1.3-0097a7)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-1976d2)
![Chalk](https://img.shields.io/badge/Chalk-6.0-c2185b)

```text
┌──────────────────────────────────────────────────────────┐
│  create-cli — Terminal UI & Prompt Framework              │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Select a framework:                               │  │
│  │                                                    │  │
│  │  > Bun   (fast, native)                            │  │
│  │    Node  (widely supported)                        │  │
│  │    Deno  (secure by default)                       │  │
│  │                                                    │  │
│  │  [============================]  60%               │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Modules: prompt, box, charts, spinner, theme, gradient   │
└──────────────────────────────────────────────────────────┘
```

## Get Started

1. Install — `bun install` in the monorepo root
   ```bash
   bun install
   ```
2. Build — `bun run build`
   ```bash
   bun run build
   ```
3. Use in your app — import components
   ```bash
   bun run dev
   ```

## Features

| Icon | Feature | Description |
|:---:|---------|-------------|
| ![icon](https://api.iconify.design/mdi:form-textbox.svg?color=%231976d2&width=16) | Interactive Prompts | Text, select, confirm, multiselect, autocomplete, date, path, password, number, editor, search |
| ![icon](https://api.iconify.design/mdi:cube-outline.svg?color=%23388e3c&width=16) | Box Rendering | Configurable borders, padding, and styles |
| ![icon](https://api.iconify.design/mdi:chart-bar.svg?color=%23f57c00&width=16) | Charts | Bar, pie, and line chart rendering |
| ![icon](https://api.iconify.design/mdi:loading.svg?color=%237b1fa2&width=16) | Spinners | Animated terminal spinners |
| ![icon](https://api.iconify.design/mdi:progress-check.svg?color=%23c2185b&width=16) | Progress Bars | Customizable progress bar rendering |
| ![icon](https://api.iconify.design/mdi:palette.svg?color=%230097a7&width=16) | Theme System | Dark, light, dracula, solarized presets |
| ![icon](https://api.iconify.design/mdi:gradient-horizontal.svg?color=%2300796b&width=16) | Gradient Text | Multi-color gradient text rendering |
| ![icon](https://api.iconify.design/mdi:power-plug.svg?color=%23ffa000&width=16) | Powerline Bars | Powerline-style status bar segments |
| ![icon](https://api.iconify.design/mdi:terminal.svg?color=%23303f9f&width=16) | CLI Framework | Command parser, help generation, shell completion |
| ![icon](https://api.iconify.design/mdi:table-large.svg?color=%23d32f2f&width=16) | Data Display | Tables, trees, lists, key-value, diff, JSON rendering |
| ![icon](https://api.iconify.design/mdi:markdown.svg?color=%231976d2&width=16) | Markdown Rendering | Render markdown in the terminal |
| ![icon](https://api.iconify.design/mdi:react.svg?color=%230097a7&width=16) | TUI Core | Reactive component framework with signals |

## Usage

### Usage via SDK

```typescript
import { text, select, confirm, renderBox, renderTable } from "@wrikka/create-cli";

const name = await text({ message: "Project name?" });
const framework = await select({
  message: "Choose framework",
  options: [{ value: "bun", label: "Bun" }, { value: "node", label: "Node" }],
});
```

```text
┌──────────────────────────────────────────────────────────┐
│  $ bun run src/index.ts                                  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Project name?                                     │  │
│  │  > my-app                                          │  │
│  │                                                    │  │
│  │  Choose framework:                                 │  │
│  │  > Bun   (fast, native)                            │  │
│  │    Node  (widely supported)                        │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

| api | description | options | default |
|-----|-------------|---------|---------|
| `text(opts)` | Text input prompt | `message`, `validate`, `defaultValue` | — |
| `select(opts)` | Single-choice select prompt | `message`, `options` | — |
| `confirm(opts)` | Yes/no confirmation prompt | `message`, `initialValue` | `true` |
| `multiselect(opts)` | Multi-choice select prompt | `message`, `options`, `required` | — |
| `renderTable(opts)` | Render data as a table | `rows`, `columns`, `border` | — |
| `renderBox(opts)` | Render content in a box | `content`, `borderStyle`, `padding` | — |
