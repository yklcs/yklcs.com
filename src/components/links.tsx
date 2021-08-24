import React from "react"
import styled, { css } from "styled-components"
import { Link as GatsbyLink } from "gatsby"

const linkStyle = css<{ $underline?: boolean }>`
  color: inherit;
  text-decoration: ${({ $underline = true }) =>
    $underline ? "underline" : "none"};
  text-decoration-thickness: 1px;
`

const InternalLink = styled(GatsbyLink)`
  ${linkStyle}
`

const ExternalLink = styled.a`
  ${linkStyle}
`

const Link = ({
  to,
  children,
  ...props
}: {
  to: string
  children: JSX.Element
}): JSX.Element =>
  to.startsWith("/") ? (
    <InternalLink to={to} {...props}>
      {children}
    </InternalLink>
  ) : (
    <ExternalLink href={to} {...props}>
      {children}
    </ExternalLink>
  )

export { InternalLink, ExternalLink }
export default Link
