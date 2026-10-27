import { PlaygroundActiveConfig } from "./playground-active-config"
import { PlaygroundBody } from "./playground-body"
import { PlaygroundControls } from "./playground-controls"
import { PlaygroundProvider } from "./playground-config"
import { PlaygroundHeader } from "./playground-header"
import { PlaygroundShell } from "./playground-shell"

export { usePlayground } from "./playground-config"
export type {
  PlaygroundCollapsible,
  PlaygroundVariant,
} from "./playground-config"

export const Playground = {
  Provider: PlaygroundProvider,
  Shell: PlaygroundShell,
  Header: PlaygroundHeader,
  Body: PlaygroundBody,
  Controls: PlaygroundControls,
  ActiveConfig: PlaygroundActiveConfig,
}
