import "styled-components"
import { PrismTheme } from "prism-react-renderer"

declare module "styled-components" {
  export interface DefaultTheme {
    background: {
      [key: string]: string
    }
    foreground: {
      [key: string]: string
    }
    syntax: PrismTheme
  }
}
