import { LayoutGroup } from "motion/react"
import type { ReactNode } from "react"

import { SidebarProvider, TooltipProvider } from "@component-template/react"

import { AppSidebar } from "@/components/app-sidebar"

import { usePlayground } from "./playground-config"
import { PlaygroundMainInset } from "./playground-main-inset"
import { PlaygroundMainStandard } from "./playground-main-standard"

export function PlaygroundShell({ children }: { children: ReactNode }) {
  const { state, meta } = usePlayground()
  const Main =
    state.variant === "inset"
      ? PlaygroundMainInset
      : PlaygroundMainStandard

  return (
    <TooltipProvider>
      <LayoutGroup id="playground-sidebar-trigger">
        <SidebarProvider key={meta.providerKey}>
          <AppSidebar />
          <Main>{children}</Main>
        </SidebarProvider>
      </LayoutGroup>
    </TooltipProvider>
  )
}
