import React from "react"
import styled from "styled-components"
import { ExternalLink, InternalLink } from "./links"

const Footer = (): JSX.Element => (
  <FooterContainer>
    <FooterHeader>
      <ScrollUpButton onClick={() => window.scrollTo(0, 0)}>↑</ScrollUpButton>
    </FooterHeader>
    <Copyright>
      <Name>Lucas Lee</Name>
      <span>© 2021</span>
    </Copyright>
    <Links>
      <InternalLink to="/" underline={false}>
        Home
      </InternalLink>
      <InternalLink to="/blog" underline={false}>
        Blog
      </InternalLink>
      <InternalLink to="/resume" underline={false}>
        Resume
      </InternalLink>
    </Links>
    <Links>
      <ExternalLink href="mailto:me@luc.li" underline={false}>
        me@luc.li
      </ExternalLink>
      <ExternalLink href="https://github.com/rocketll" underline={false}>
        github.com/rocketll
      </ExternalLink>
    </Links>
    <SiteInfo>
      <InternalLink to="/colophon" underline={false}>
        Colophon
      </InternalLink>
      {" · "}
      <ExternalLink href="https://github.com/rocketll/luc.li" underline={false}>
        Site source
      </ExternalLink>
    </SiteInfo>
  </FooterContainer>
)

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 2;
`

const SiteInfo = styled.div`
  grid-column: 1/-1;
  margin: 3rem 0 0 0;
  color: ${({ theme }) => theme.neutral.l65};
`

const ScrollUpButton = styled.button`
  justify-self: center;
  margin: -1.75rem;
  padding: 0.75rem 0.3rem;
  color: ${({ theme }) => theme.neutral.l65};
  font-size: 1em;
  line-height: inherit;
  background: ${({ theme }) => theme.neutral.l100};
  border: none;
  outline: none;
  transition: transform 0.5s;
  appearance: none;

  &:hover {
    transform: translateY(-0.5rem);
  }
`

const FooterHeader = styled.div`
  display: flex;
  grid-column: 1/-1;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.neutral.l95};
`

const Name = styled.span`
  font-weight: 700;
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: 50rem) {
    grid-column: span 2;
  }
`

const FooterContainer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin: 12rem 0 0 0;
  padding: 1.5rem 0;
  color: inherit;
  line-height: 1.5rem;

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;
  }
`

export default Footer
