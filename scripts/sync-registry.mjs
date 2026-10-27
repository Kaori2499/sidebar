import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

const reactSrc = path.join(root, "packages/react/src")
const playgroundSrc = path.join(root, "apps/playground/src")
const registryRoot = path.join(root, "registry")

function removeIfExists(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true })
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function write(filePath, content) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content, "utf8")
}

function copyTransform(srcPath, destPath, transform) {
  const raw = fs.readFileSync(srcPath, "utf8")
  write(destPath, transform(raw))
}

function transformUiSource(content) {
  return content
    .replaceAll('from "cn"', 'from "@/lib/utils"')
    .replaceAll('from "../hooks/use-mobile"', 'from "@/hooks/use-mobile"')
    .replaceAll('from "./button"', 'from "@/components/ui/button"')
    .replaceAll('from "./input"', 'from "@/components/ui/input"')
    .replaceAll('from "./separator"', 'from "@/components/ui/separator"')
    .replaceAll('from "./sheet"', 'from "@/components/ui/sheet"')
    .replaceAll('from "./skeleton"', 'from "@/components/ui/skeleton"')
    .replaceAll('from "./tooltip"', 'from "@/components/ui/tooltip"')
}

removeIfExists(path.join(registryRoot, "lib"))
removeIfExists(path.join(registryRoot, "hooks"))
removeIfExists(path.join(registryRoot, "blocks", "sidebar-playground", "playground"))

const uiFiles = [
  "button.tsx",
  "input.tsx",
  "separator.tsx",
  "sheet.tsx",
  "skeleton.tsx",
  "tooltip.tsx",
  "sidebar.tsx",
]

for (const file of uiFiles) {
  copyTransform(
    path.join(reactSrc, "ui", file),
    path.join(registryRoot, "ui", file),
    transformUiSource,
  )
}

write(
  path.join(registryRoot, "ui", "lib", "utils.ts"),
  `export { cn } from "cn"\n`,
)

copyTransform(
  path.join(reactSrc, "hooks", "use-mobile.ts"),
  path.join(registryRoot, "ui", "hooks", "use-mobile.ts"),
  (content) => content,
)

const playgroundBlockRoot = path.join(
  registryRoot,
  "blocks",
  "sidebar-playground",
)

function transformPlaygroundFile(relativePath, content) {
  let next = content

  next = next.replaceAll(
    "@/playground",
    "@/components/blocks/sidebar-playground",
  )
  next = next.replaceAll(
    "@/components/app-sidebar",
    "@/components/blocks/sidebar-playground/app-sidebar",
  )
  next = next.replaceAll(
    "@/components/animated-sidebar-trigger",
    "@/components/blocks/sidebar-playground/animated-sidebar-trigger",
  )

  if (relativePath === "components/app-sidebar.tsx") {
    next = next.replace(
      /import \{[^}]+\} from "@component-template\/react"/,
      `import { Sidebar, SidebarHeader } from "@/components/ui/sidebar"`,
    )
    next = next.replace(
      /import \{ usePlayground \} from "@\/components\/blocks\/sidebar-playground"/,
      `import { usePlayground } from "@/components/blocks/sidebar-playground/playground-config"`,
    )
  } else if (relativePath === "components/animated-sidebar-trigger.tsx") {
    next = next.replace(
      /import \{ SidebarTrigger \} from "@component-template\/react"/,
      `import { SidebarTrigger } from "@/components/ui/sidebar"`,
    )
  } else if (relativePath === "playground/playground-controls.tsx") {
    next = next.replace(
      /import \{ Button \} from "@component-template\/react"/,
      `import { Button } from "@/components/ui/button"`,
    )
  } else if (relativePath === "playground/playground-shell.tsx") {
    next = next.replace(
      /import \{[^}]+\} from "@component-template\/react"/,
      `import { SidebarProvider, TooltipProvider } from "@/components/ui/sidebar"`,
    )
  } else if (relativePath === "playground/playground-main-inset.tsx") {
    next = next.replace(
      /import \{ SidebarInset \} from "@component-template\/react"/,
      `import { SidebarInset } from "@/components/ui/sidebar"`,
    )
  } else if (relativePath === "playground/playground-header.tsx") {
    next = next.replace(
      /import \{ useSidebar \} from "@component-template\/react"/,
      `import { useSidebar } from "@/components/ui/sidebar"`,
    )
  } else if (relativePath === "playground/control-group.tsx") {
    next = next.replace(
      /import \{ Button \} from "@component-template\/react"/,
      `import { Button } from "@/components/ui/button"`,
    )
  }

  next = next.replaceAll("@component-template/react", "@/components/ui/sidebar")

  return next
}

const playgroundFiles = [
  "App.tsx",
  "components/app-sidebar.tsx",
  "components/animated-sidebar-trigger.tsx",
  "playground/index.ts",
  "playground/playground-config.tsx",
  "playground/playground-header.tsx",
  "playground/playground-controls.tsx",
  "playground/playground-active-config.tsx",
  "playground/playground-body.tsx",
  "playground/playground-shell.tsx",
  "playground/playground-main-inset.tsx",
  "playground/playground-main-standard.tsx",
  "playground/control-group.tsx",
]

for (const relative of playgroundFiles) {
  const srcPath = path.join(playgroundSrc, relative)
  let destRelative = relative
  if (relative === "App.tsx") {
    destRelative = "sidebar-playground.tsx"
  } else if (relative.startsWith("playground/")) {
    destRelative = relative.replace(/^playground\//, "")
  }
  const destPath = path.join(playgroundBlockRoot, destRelative)
  copyTransform(srcPath, destPath, (content) => {
    let next = transformPlaygroundFile(relative, content)
    if (relative === "App.tsx") {
      next = next.replace(
        "export function App()",
        "export function SidebarPlaygroundDemo()",
      )
    }
    return next
  })
}

write(
  path.join(playgroundBlockRoot, "sidebar-playground.css"),
  `/* Peek variant: app header triggers replace the built-in expand control */
[data-slot="sidebar"][data-variant="peek"] [data-slot="sidebar-expand"] {
  display: none;
}

/* Hide the page trigger as soon as peek opens */
[data-slot="sidebar-wrapper"]:has([data-slot="sidebar"][data-peek="true"])
  [data-slot="page-sidebar-trigger"] {
  display: none;
}

/* Match sidebar surface to main content (playground demo) */
[data-slot="sidebar-inner"],
[data-slot="sidebar"][data-mobile="true"] {
  background-color: var(--background);
  color: var(--foreground);
}
`,
)

console.log("Registry sources synced to registry/")
