import { DefaultTheme } from "styled-components"

const theme: DefaultTheme = {
  background: {
    default: "#ffffffff",
    selection: "#00000022",
    highlight: "#eeff00ff",
    sub: "#eeeeeeff",
  },
  foreground: {
    default: "#333333ff",
    sub: "#a0a0a0ff",
    link: "#6196f2ff",
  },
  syntax: {
    plain: {
      color: "#333333ff",
      backgroundColor: "#eeeeeeff",
    },
    styles: [
      {
        types: ["comment"],
        style: {
          color: "#a0a0a0ff",
        },
      },
      {
        types: ["builtin", "changed", "keyword", "punctuation", "operator"],
        style: {
          color: "#777777ff",
        },
      },
      {
        types: ["constant", "number", "inserted", "string"],
        style: {
          color: "#6196f2ff",
        },
      },
      {
        types: ["function"],
        style: {
          fontWeight: "bold",
        },
      },
    ],
  },
}

export default theme
