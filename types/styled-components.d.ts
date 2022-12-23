import "styled-components"
import { PrismTheme } from "prism-react-renderer"
import {} from "styled-components/cssprop"

type Breakpoint = "sm" | "md" | "lg"

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      [key in Breakpoint]: string
    }
    syntax: PrismTheme
    colors: {
      [key: string]: string
    }
  }
}
