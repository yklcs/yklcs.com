import {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
} from "styled-components"
import type { Breakpoint } from "../../types/styled-components"
import theme from "../theme"

const respond = (
  bp: Breakpoint | number,
  style: FlattenSimpleInterpolation | FlattenInterpolation<object>
) => css`
  @media screen and (max-width: ${typeof bp === "number"
      ? `${bp}rem`
      : theme.breakpoints[bp]}) {
    ${css`
      ${style}
    `}
  }
`

export default respond
