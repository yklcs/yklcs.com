import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 5rem 0;
  color: #a0a0a0;
`

const linkStyle = css`
  margin: 0 -0.4em;
  padding: 0.3em 0.4em;
  color: #a0a0a0;
  font-size: 1em;
  text-decoration: none;
  background: none;
  border: none;
  border-radius: 0.6rem;
  outline: inherit;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f0f0f0;
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

const Footer = ({ location }) => (
  <FooterContainer>
    <HeaderText>— Lucas Yunkyu Lee 2021</HeaderText>
    {location.pathname !== "/" && <InternalLink to="/">Home</InternalLink>}
    <ALink href="https://github.com/rocketll/luc.li">Site Source</ALink>
  </FooterContainer>
)

export default Footer
