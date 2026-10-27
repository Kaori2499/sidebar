import type { ReactNode } from "react"

export function PlaygroundMainStandard({ children }: { children: ReactNode }) {
  return (
    <main
      className="relative flex w-full flex-1 flex-col bg-background"
      data-testid="sidebar-main"
    >
      {children}
    </main>
  )
}
