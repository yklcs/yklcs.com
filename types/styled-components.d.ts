import "styled-components"
import { PrismTheme } from "prism-react-renderer"

declare module "styled-components" {
  export interface DefaultTheme {
    background: {
      // default: string,
      // selection: string,
      // highlight: string,
      // sub: string,
      [key: string]: string
    }
    foreground: {
      default: string
      sub: string
      link: string
    }
    syntax: PrismTheme
  }
}
