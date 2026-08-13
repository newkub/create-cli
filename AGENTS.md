# AGENTS.md — @wrikka/create-cli
> Agent guidance for `packages/create-cli` in the `@wrikka/bun-packages` monorepo.

## Overview

- **Package name:** `@wrikka/create-cli`
- **Version:** `0.1.0`
- **Workspace path:** `packages/create-cli`
- **Type:** `ESM`
- **Entry point:** `src/index.ts`

## Technology

| Tech | Value |
|---|---|
| Package Manager | Bun |
| Runtime | Bun / Node |
| Type | ESM |
| TS module | ESNext |
| TS target | ES2022 |

## Commands

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

## Dependencies

| Package | Version | Type |
|---|---|---|
| `@wrikka/shared` | `workspace:*` | Runtime |
| `chalk` | `^6.0.0` | Runtime |
| `shiki` | `^4.4.3` | Runtime |
| `@biomejs/biome` | `^2.5.8` | Dev |
| `@types/bun` | `^1.3.14` | Dev |
| `@types/node` | `^26.2.0` | Dev |
| `@wrikka/default-config` | `workspace:*` | Dev |
| `bunup` | `^0.16.32` | Dev |
| `typescript` | `^7.0.2` | Dev |
| `vitest` | `^4.1.10` | Dev |

## Notes for AI Agents

- Use **Bun** for running scripts (`bun run <script>`).
- This monorepo uses Turborepo (`turbo run <task>`) and Moonrepo conventions where configured.
- TypeScript native compiler (`tsgo`) is used when available.
- Do not introduce `pnpm-lock.yaml`; this project uses Bun.
- This package is consumed as a Git submodule by `@wrikka/bun-packages` at `packages/create-cli`.
- Before destructive operations (delete, overwrite, `rm -rf`, submodule extraction), ask the user for explicit confirmation.
- Keep English wording and avoid ANSI escape codes in documentation.
- Test result reporting (formerly @wrikka/reporter) is merged into this package under `src/reporter` and re-exported from `src/index.ts`.

## Related Files

- `package.json`
- `tsconfig.json`
- `README.md`
