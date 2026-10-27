import { ControlGroup } from "./control-group"
import {
  playgroundCollapsibles,
  playgroundVariants,
  usePlayground,
} from "./playground-config"

export function PlaygroundControls() {
  const { state, actions } = usePlayground()
  const { variant, collapsible } = state
  const { setVariant, setCollapsible } = actions

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Controls</h2>
        <p className="text-sm text-muted-foreground">
          Tweak the sidebar props below. The provider remounts so each
          combination applies cleanly.
        </p>
      </section>

      <div
        className={`grid gap-6 rounded-xl border bg-card p-4 text-card-foreground shadow-sm ${
          variant === "peek" ? "sm:grid-cols-1" : "sm:grid-cols-2"
        }`}
      >
        <ControlGroup
          label="Variant"
          testId="control-variant"
          value={variant}
          options={playgroundVariants}
          onChange={setVariant}
        />
        {variant !== "peek" ? (
          <ControlGroup
            label="Collapsible"
            testId="control-collapsible"
            value={collapsible}
            options={playgroundCollapsibles}
            onChange={setCollapsible}
          />
        ) : null}
      </div>
    </>
  )
}
