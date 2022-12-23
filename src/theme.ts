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

const colors = {
  text: hsl(228, 0.07, 0.88),
  subtext: hsl(228, 0.07, 0.5),
  highlight: hsl(
    elapsedDateRatio(serviceBeginDate, new Date(), serviceEndDate) * 120,
    0.7,
    0.65
  ),
  bg: hsl(228, 0.07, 0.08),
  subbg: hsl(228, 0.07, 0.15),
}

const theme: DefaultTheme = {
  breakpoints: {
    sm: "35rem",
    md: "70rem",
    lg: "100rem",
  },
  colors: colors,
  syntax: {
    plain: {
      color: colors.text,
      backgroundColor: hsl(228, 0.07, 0.15),
    },
    styles: [
      {
        types: ["comment"],
        style: {
          color: colors.subtext,
        },
      },
      {
        types: ["builtin", "changed", "keyword", "punctuation", "operator"],
        style: {
          color: colors.subtext,
        },
      },
      {
        types: ["constant", "number", "inserted", "string"],
        style: {
          color: colors.highlight,
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
