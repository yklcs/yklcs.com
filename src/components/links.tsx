import React, { ReactNode } from "react"
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
  $underline,
  ...props
}: {
  to: string
  children: ReactNode
  $underline?: boolean
}): JSX.Element =>
  to.startsWith("/") ? (
    <InternalLink to={to} $underline={$underline} {...props}>
      {children}
    </InternalLink>
  ) : (
    <ExternalLink href={to} $underline={$underline} {...props}>
      {children}
    </ExternalLink>
  )

export { InternalLink, ExternalLink }
export default Link
