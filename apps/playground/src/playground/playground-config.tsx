import * as React from "react"

export type PlaygroundVariant = "sidebar" | "floating" | "inset" | "peek"
export type PlaygroundCollapsible = "offcanvas" | "icon" | "none"

export const playgroundVariants: PlaygroundVariant[] = [
  "sidebar",
  "floating",
  "inset",
  "peek",
]

export const playgroundCollapsibles: PlaygroundCollapsible[] = [
  "offcanvas",
  "icon",
  "none",
]

type PlaygroundState = {
  variant: PlaygroundVariant
  collapsible: PlaygroundCollapsible
}

type PlaygroundActions = {
  setVariant: (variant: PlaygroundVariant) => void
  setCollapsible: (collapsible: PlaygroundCollapsible) => void
}

type PlaygroundMeta = {
  providerKey: string
}

type PlaygroundContextValue = {
  state: PlaygroundState
  actions: PlaygroundActions
  meta: PlaygroundMeta
}

const PlaygroundContext = React.createContext<PlaygroundContextValue | null>(
  null,
)

export function usePlayground() {
  const context = React.useContext(PlaygroundContext)
  if (!context) {
    throw new Error("usePlayground must be used within Playground.Provider.")
  }
  return context
}

type PlaygroundProviderProps = {
  children: React.ReactNode
  defaultVariant?: PlaygroundVariant
  defaultCollapsible?: PlaygroundCollapsible
}

export function PlaygroundProvider({
  children,
  defaultVariant = "peek",
  defaultCollapsible = "offcanvas",
}: PlaygroundProviderProps) {
  const [variant, setVariant] =
    React.useState<PlaygroundVariant>(defaultVariant)
  const [collapsible, setCollapsible] =
    React.useState<PlaygroundCollapsible>(defaultCollapsible)

  const providerKey = React.useMemo(
    () => `${variant}-${collapsible}`,
    [variant, collapsible],
  )

  const value = React.useMemo<PlaygroundContextValue>(
    () => ({
      state: { variant, collapsible },
      actions: { setVariant, setCollapsible },
      meta: { providerKey },
    }),
    [variant, collapsible, providerKey],
  )

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  )
}
