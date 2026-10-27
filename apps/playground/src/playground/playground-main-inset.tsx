import type { ReactNode } from "react"

import { SidebarInset } from "@component-template/react"

export function PlaygroundMainInset({ children }: { children: ReactNode }) {
  return (
    <SidebarInset data-testid="sidebar-inset">
      <div className="relative flex w-full flex-1 flex-col bg-background">
        {children}
      </div>
    </SidebarInset>
  )
}
