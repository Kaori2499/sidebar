import { Playground } from "@/playground"

export function App() {
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
