---
name: @wrikka/create-cli
description: Create CLI - Unified terminal prompt, UI, TUI framework, CLI framework, and data display utilities
related:
  - follow-create-devin-skills
  - follow-skills-map
  - improve-codebase
  - optimize-codebase
  - ask-me
---

## Goal

Agent guidance for the `@wrikka/create-cli` workspace.

## Scope

This workspace lives in `apps/cli/create-cli` within the monorepo.

## Execute

Run the following scripts from `apps/cli/create-cli`:

| Script | Command |
|---|---|
| `dev` | `bun run src/index.ts` |
| `build` | `bunup` |
| `build:watch` | `bunup --watch` |
| `typecheck` | `tsgo --noEmit` |
| `typecheck:watch` | `tsgo --noEmit --watch` |
| `lint` | `biome check` |
| `lint:fix` | `biome check --write` |
| `format` | `biome check --write` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |
| `test:coverage` | `vitest run --coverage` |
| `scan` | `ast-grep scan` |
| `check` | `bun run lint && bun run typecheck && bun run scan` |
| `verify` | `bun run check && bun run test && bun run build` |
| `deps:analyze` | `bunx depcheck` |
| `clean` | `bunx rimraf dist node_modules` |
| `security` | `bunx audit` |

### Architecture

| Tech | Skill |
|---|---|
| (external) | `tech: /learn-from-web` |
| biome | `tech: /follow-biome` |
| typescript | `tech: /follow-typescript` |
| bunup | `tech: /follow-bunup` |
| vitest | `tech: /follow-vitest` |

### Skills

- follow-create-devin-skills
- follow-skills-map
- improve-codebase
- optimize-codebase
- ask-me

### Workspaces

- uses: `@wrikka/shared` (`packages/shared`)
- uses: `@wrikka/default-config` (`packages/lib/default-config`)

## Rules

- Keep under 250 lines.
- Map tech stack with `tech: /follow-<skill>`.
- Map workspace dependencies in `uses:`.
- Do not duplicate root conventions.

## Expected Outcome

- `@wrikka/create-cli` AGENTS.md is accurate and committed.
