import { hsl } from "polished"
import { DefaultTheme } from "styled-components"

const elapsedDateRatio = (begin: Date, now: Date, end: Date) =>
  Math.min(
    Math.max(
      (now.valueOf() - begin.valueOf()) / (end.valueOf() - begin.valueOf()),
      0
    ),
    1
  )
const serviceBeginDate = new Date("2022-09-19T14:00:00+0900")
const serviceEndDate = new Date("2024-03-18T14:00:00+0900")

const theme: DefaultTheme = {
  breakpoints: {
    sm: "35rem",
    md: "70rem",
    lg: "100rem",
  },
  colors: {
    l100: hsl(228, 0.07, 1),
    l95: hsl(228, 0.07, 0.95),
    l50: hsl(228, 0.07, 0.5),
    l65: hsl(228, 0.07, 0.65),
    l15: hsl(228, 0.07, 0.15),
    text: hsl(228, 0.07, 0.88),
    subtext: hsl(228, 0.07, 0.5),
    highlight: hsl(
      elapsedDateRatio(serviceBeginDate, new Date(), serviceEndDate) * 120,
      0.7,
      0.65
    ),
    bg: hsl(228, 0.07, 0.08),
    subbg: hsl(228, 0.07, 0.2),
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
