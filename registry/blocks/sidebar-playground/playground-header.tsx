import { useSidebar } from "@/components/ui/sidebar"

import { AnimatedSidebarTrigger } from "@/components/blocks/sidebar-playground/animated-sidebar-trigger"

import { usePlayground } from "./playground-config"

export function PlaygroundHeader() {
  const { state } = usePlayground()
  const { state: sidebarState, peekOpen } = useSidebar()
  const showPageTrigger =
    sidebarState === "collapsed" &&
    !(state.variant === "peek" && peekOpen)

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-start px-4">
      {showPageTrigger ? (
        <AnimatedSidebarTrigger
          data-slot="page-sidebar-trigger"
          data-testid="sidebar-trigger"
        />
      ) : null}
    </header>
  )
}
