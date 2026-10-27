import { Sidebar, SidebarHeader } from "@component-template/react"

import { AnimatedSidebarTrigger } from "@/components/animated-sidebar-trigger"
import { usePlayground } from "@/playground"

export function AppSidebar() {
  const { state } = usePlayground()
  const { variant, collapsible } = state

  return (
    <Sidebar side="left" variant={variant} collapsible={collapsible}>
      <SidebarHeader className="h-14 shrink-0 flex-row items-center justify-end gap-0 p-0 px-4">
        <AnimatedSidebarTrigger data-testid="sidebar-trigger" />
      </SidebarHeader>
    </Sidebar>
  )
}
