import { useMemo, useState } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

type Variant = "sidebar" | "floating" | "inset"
type Collapsible = "offcanvas" | "icon" | "none"
type Side = "left" | "right"

const variants: Variant[] = ["sidebar", "floating", "inset"]
const collapsibles: Collapsible[] = ["offcanvas", "icon", "none"]
const sides: Side[] = ["left", "right"]

function ControlGroup<T extends string>({
  label,
  testId,
  value,
  options,
  onChange,
}: {
  label: string
  testId: string
  value: T
  options: readonly T[]
  onChange: (next: T) => void
}) {
  return (
    <fieldset className="space-y-2" data-testid={testId}>
      <legend className="text-sm font-medium text-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            size="sm"
            variant={value === option ? "default" : "outline"}
            data-testid={`${testId}-${option}`}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </fieldset>
  )
}

export function App() {
  const [variant, setVariant] = useState<Variant>("sidebar")
  const [collapsible, setCollapsible] = useState<Collapsible>("offcanvas")
  const [side, setSide] = useState<Side>("left")

  const providerKey = useMemo(
    () => `${variant}-${collapsible}-${side}`,
    [variant, collapsible, side],
  )

  const main = (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger data-testid="sidebar-trigger" />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold leading-none">
            shadcn/ui Base Sidebar
          </h1>
          <p className="text-xs text-muted-foreground">
            Live playground for variant / collapsible / side
          </p>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight">Controls</h2>
          <p className="text-sm text-muted-foreground">
            Tweak the sidebar props below. The provider remounts so each
            combination applies cleanly.
          </p>
        </section>

        <div className="grid gap-6 rounded-xl border bg-card p-4 text-card-foreground shadow-sm sm:grid-cols-3">
          <ControlGroup
            label="Variant"
            testId="control-variant"
            value={variant}
            options={variants}
            onChange={setVariant}
          />
          <ControlGroup
            label="Collapsible"
            testId="control-collapsible"
            value={collapsible}
            options={collapsibles}
            onChange={setCollapsible}
          />
          <ControlGroup
            label="Side"
            testId="control-side"
            value={side}
            options={sides}
            onChange={setSide}
          />
        </div>

        <section
          className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground"
          data-testid="active-config"
        >
          Active:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            variant={variant}
          </code>{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            collapsible={collapsible}
          </code>{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            side={side}
          </code>
        </section>
      </div>
    </>
  )

  return (
    <TooltipProvider>
      <SidebarProvider key={providerKey}>
        <AppSidebar side={side} variant={variant} collapsible={collapsible} />
        {variant === "inset" ? (
          <SidebarInset data-testid="sidebar-inset">{main}</SidebarInset>
        ) : (
          <main className="relative flex w-full flex-1 flex-col bg-background" data-testid="sidebar-main">
            {main}
          </main>
        )}
      </SidebarProvider>
    </TooltipProvider>
  )
}
