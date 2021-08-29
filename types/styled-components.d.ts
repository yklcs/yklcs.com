import "styled-components"
import { PrismTheme } from "prism-react-renderer"
import {} from "styled-components/cssprop"

declare module "styled-components" {
  export interface DefaultTheme {
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
