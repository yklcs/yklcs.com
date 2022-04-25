import { hsl } from "polished"
import { DefaultTheme } from "styled-components"

const theme: DefaultTheme = {
  breakpoints: {
    sm: "40rem",
    md: "70rem",
    lg: "100rem",
  },
  neutral: {
    l100: hsl(228, 0.07, 1),
    l95: hsl(228, 0.07, 0.95),
    l50: hsl(228, 0.07, 0.5),
    l65: hsl(228, 0.07, 0.65),
    l15: hsl(228, 0.07, 0.15),
  },
  brand: {
    l80: hsl(228, 0.76, 0.8),
    l50: hsl(228, 0.76, 0.5),
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
