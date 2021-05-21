import "styled-components"

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
    syntax: {
      plain: {
        color: string
        backgroundColor: string
      }
      styles: {
        types: string[]
        style: {
          color?: string
          fontWeight?: string
        }
      }[]
    }
  }
}
