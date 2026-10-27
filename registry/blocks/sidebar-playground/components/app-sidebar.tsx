import { Sidebar, SidebarHeader } from "@/components/ui/sidebar"

import { AnimatedSidebarTrigger } from "@/components/blocks/sidebar-playground/animated-sidebar-trigger"
import { usePlayground } from "@/components/blocks/sidebar-playground/playground-config"

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
