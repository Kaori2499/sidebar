import { usePlayground } from "./playground-config"

export function PlaygroundActiveConfig() {
  const { state } = usePlayground()
  const { variant, collapsible } = state

  return (
    <section
      className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground"
      data-testid="active-config"
    >
      Active:{" "}
      <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
        variant={variant}
      </code>{" "}
      {variant !== "peek" ? (
        <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
          collapsible={collapsible}
        </code>
      ) : null}
    </section>
  )
}
