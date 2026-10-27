# sidebar

Bun monorepo playground for the [shadcn/ui Base Sidebar](https://ui.shadcn.com/docs/components/base/sidebar) (Base UI + Nova). Forked from `component-template`.

```
sidebar/
├── apps/playground/     # Vite + shadcn Base Sidebar demo
│   └── src/components/  # AppSidebar + ui/* from shadcn CLI
├── packages/react/      # leftover stub from the template (unused by the demo)
├── e2e/                 # Playwright against the playground
└── playwright.config.ts
```

## Commands

```bash
bun install
bun run build          # packages/react -> dist/ (template stub)
bun run dev            # playground -> http://127.0.0.1:5174
bun run typecheck
bunx playwright install chromium   # once
bun run test:e2e
```

## Playground demo

`bun run dev` opens a live sidebar with header, nav groups (icons), and footer. Use the on-page controls to switch:

- **variant:** `sidebar` | `floating` | `inset`
- **collapsible:** `offcanvas` | `icon` | `none`
- **side:** `left` | `right`

Changing a control remounts `SidebarProvider` so the new props apply cleanly. The inset variant wraps main content in `SidebarInset`. Toggle with the header trigger or `Ctrl/Cmd+B`.

shadcn was initialized in `apps/playground` with `--base base` / Nova (`style: "base-nova"`). UI primitives live under `apps/playground/src/components/ui`.

Port **5174** is used so it does not clash with other Vite apps on this machine that already bind 5173.

## License

MIT - see `LICENSE`.