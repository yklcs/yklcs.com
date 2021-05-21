import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"

interface FooterProps {
  location: WindowLocation
}

const Footer: FunctionComponent<FooterProps> = ({ location }) => (
  <FooterContainer>
    <HeaderText>— Lucas Yunkyu Lee 2021</HeaderText>
    {location.pathname !== "/" && <InternalLink to="/">Home</InternalLink>}
    <ALink href="https://github.com/rocketll/luc.li">Site Source</ALink>
  </FooterContainer>
)

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 5rem 0;
  color: ${({ theme }) => theme.foreground.sub};
`

const linkStyle = css`
  margin: 0 -0.4em;
  padding: 0.3em 0.4em;
  color: ${({ theme }) => theme.foreground.sub};
  font-size: 1em;
  text-decoration: none;
  background: none;
  border: none;
  border-radius: 0.6rem;
  outline: inherit;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.background.sub};
  }
`

const ALink = styled.a`
  ${linkStyle}
`

const InternalLink = styled(Link)`
  ${linkStyle}
`

const HeaderText = styled.p`
  margin: 0 0 0.3rem 0;
`

export default Footer
