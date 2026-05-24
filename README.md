# phaser3-electron

A small, hardened starter for desktop games built with [Phaser](https://phaser.io)
and [Electron](https://www.electronjs.org), in TypeScript.

- Electron with `contextIsolation`, `sandbox`, no `nodeIntegration`, CSP meta
- Phaser scene split into a thin Phaser adapter + pure game-logic modules
  (`src/game/`) so the rules are unit-testable
- electron-vite for dev/build (main + preload + renderer)
- electron-builder for packaging (Windows / macOS / Linux)
- ESLint 9 (flat config) + oxfmt
- Vitest with 12 tests covering player controls and scoring
- pnpm with a 7-day package quarantine and a built-script allowlist

## Requirements

- Node.js **22 or newer**
- pnpm — installed automatically by [corepack](https://nodejs.org/api/corepack.html)
  from the `packageManager` field, no manual install needed

## Quick start

```bash
corepack enable
pnpm install
pnpm dev
```

## Scripts

| Command                              | What it does                                             |
| ------------------------------------ | -------------------------------------------------------- |
| `pnpm dev`                           | Run the app in dev mode with HMR                         |
| `pnpm build`                         | Build main + preload + renderer to `out/`                |
| `pnpm start`                         | Preview the production build                             |
| `pnpm test`                          | Run vitest once                                          |
| `pnpm test:watch`                    | Run vitest in watch mode                                 |
| `pnpm lint` / `pnpm lint:fix`        | ESLint                                                   |
| `pnpm format` / `pnpm format:check`  | oxfmt                                                    |
| `pnpm typecheck`                     | Type-check main, renderer, and tests                     |
| `pnpm check`                         | format:check → lint → typecheck → test (the CI contract) |
| `pnpm build:win` / `:mac` / `:linux` | Package an installer for the target OS                   |

## Layout

```
src/
  main/          Electron main process
  preload/       Preload script (contextBridge only)
  game/          Pure game logic, no Phaser imports — unit-tested
  renderer/
    index.html
    public/assets/   Sprites served as static files
    src/             Phaser entry point + scenes
tests/             Vitest specs for src/game
```

## After cloning this template, rename

| Field         | File                      | Default                |
| ------------- | ------------------------- | ---------------------- |
| `name`        | `package.json`            | `phaser3-electron`     |
| `appId`       | `electron-builder.yml`    | `com.phaser3.electron` |
| `productName` | `electron-builder.yml`    | `phaser3-electron`     |
| Window title  | `src/renderer/index.html` | `Phaser 3 + Electron`  |

## Security notes

The Electron setup follows the official security checklist for the items that
are realistic to enforce statically: sandboxing, context isolation, no Node in
the renderer, deny-by-default for `window.open`, CSP meta tag. The known gaps —
no `will-navigate` handler, no `shell.openExternal` scheme validation, no
header-level CSP — are documented but not yet implemented; add them before
shipping a real product.

## License

MIT — see [LICENSE](./LICENSE).
