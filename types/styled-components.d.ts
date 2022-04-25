import "styled-components"
import { PrismTheme } from "prism-react-renderer"
import {} from "styled-components/cssprop"

type Breakpoint = "sm" | "md" | "lg"

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      [key in Breakpoint]: string
    }
    neutral: {
      l100: string
      l95: string
      l65: string
      l50: string
      l15: string
    }
    brand: {
      l80: string
      l50: string
    }
    syntax: PrismTheme
  }
}
