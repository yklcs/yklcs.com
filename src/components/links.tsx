import React, { HTMLProps, ReactNode } from "react"
import styled, { css } from "styled-components"
import { GatsbyLinkProps, Link as GatsbyLink } from "gatsby"

const linkStyle = css<{ $underline?: boolean }>`
  color: inherit;
  text-decoration: ${({ $underline = true }) =>
    $underline ? "underline" : "none"};
  text-decoration-thickness: 1px;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`

const InternalLink = styled(GatsbyLink)`
  ${linkStyle}
`

const ExternalLink = styled.a`
  ${linkStyle}
`

type LinkProps = HTMLProps<HTMLAnchorElement> & {
  to: string
  $underline?: boolean
}

const Link = ({ to, $underline, children }: LinkProps): JSX.Element =>
  to.startsWith("/") ? (
    <InternalLink to={to} $underline={$underline}>
      {children}
    </InternalLink>
  ) : (
    <ExternalLink href={to} $underline={$underline}>
      {children}
    </ExternalLink>
  )

export { InternalLink, ExternalLink }
export default Link
