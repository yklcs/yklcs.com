import { DefaultTheme } from "styled-components"

const theme: DefaultTheme = {
  background: {
    default: "#ffffff",
    selection: "#00000022",
    highlight: "#182494",
    sub: "#eeeeeeff",
  },
  foreground: {
    default: "#000000",
    sub: "#00000066",
    link: "#6196f2ff",
    highlight: "#1d42d5",
    highlightSub: "#1d42d566",
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
