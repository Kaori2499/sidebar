import { Playground } from "@/components/blocks/sidebar-playground"

export function SidebarPlaygroundDemo() {
  return (
    <Playground.Provider>
      <Playground.Shell>
        <Playground.Header />
        <Playground.Body>
          <Playground.Controls />
          <Playground.ActiveConfig />
        </Playground.Body>
      </Playground.Shell>
    </Playground.Provider>
  )
}
