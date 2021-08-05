import "styled-components"
import { PrismTheme } from "prism-react-renderer"
import {} from "styled-components/cssprop"

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
