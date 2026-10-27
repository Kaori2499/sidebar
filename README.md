# sidebar

Bun monorepo playground for the [shadcn/ui Base Sidebar](https://ui.shadcn.com/docs/components/base/sidebar) (Base UI + Nova). Forked from `component-template`.

```
sidebar/
├── apps/playground/     # Vite demo + AppSidebar composition + controls
├── packages/react/      # @component-template/react — sidebar + UI primitives
├── e2e/                 # Playwright against the playground
└── playwright.config.ts
```

## Commands

```bash
bun install
bun run build          # packages/react -> dist/
bun run dev            # playground -> http://127.0.0.1:5174
bun run typecheck
bunx playwright install chromium   # once
bun run test:e2e
```

## Package

UI primitives live in `packages/react` and are imported as `@component-template/react`.

```ts
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  Button,
} from "@component-template/react"
import "@component-template/react/styles.css"
```

Theme tokens ship as `styles.css`. The playground CSS also `@source`s the package so Tailwind emits classes used by the primitives.

## Playground demo

`bun run dev` opens a live sidebar with header, nav groups (icons), and footer. Use the on-page controls to switch:

- **variant:** `sidebar` | `floating` | `inset`
- **collapsible:** `offcanvas` | `icon` | `none`
- **side:** `left` | `right`

Changing a control remounts `SidebarProvider` so the new props apply cleanly. Dark theme is on by default (`class="dark"` on `<html>`). Toggle with the header trigger or `Ctrl/Cmd+B`.

Port **5174** is used so it does not clash with other Vite apps on this machine that already bind 5173.

## License

MIT - see `LICENSE`.
