import { SidebarTrigger } from "@/components/ui/sidebar"
import { motion, useReducedMotion } from "motion/react"
import type { ComponentProps } from "react"

export const PLAYGROUND_SIDEBAR_TRIGGER_LAYOUT_ID = "playground-sidebar-trigger"

const sharedLayoutTransition = {
  type: "tween" as const,
  duration: 0.2,
  ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
}

type AnimatedSidebarTriggerProps = ComponentProps<typeof SidebarTrigger>

export function AnimatedSidebarTrigger(props: AnimatedSidebarTriggerProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      layoutId={PLAYGROUND_SIDEBAR_TRIGGER_LAYOUT_ID}
      layout={!reduceMotion}
      transition={reduceMotion ? { duration: 0 } : sharedLayoutTransition}
      className="shrink-0"
    >
      <SidebarTrigger {...props} />
    </motion.div>
  )
}
