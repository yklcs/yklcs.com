import styled, { css } from "styled-components"
import { Link } from "gatsby"

const linkStyle = css`
  color: inherit;
  text-decoration: ${({ underline = true }: { underline?: boolean }) =>
    underline ? "underline" : "none"};
  text-decoration-thickness: 1px;
`

const InternalLink = styled(Link)`
  ${linkStyle}
`

const ExternalLink = styled.a`
  ${linkStyle}
`

export { InternalLink, ExternalLink }