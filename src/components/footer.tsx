import React from "react"
import styled from "styled-components"
import { ExternalLink, InternalLink } from "./links"

const Footer = (): JSX.Element => (
  <FooterContainer>
    <ScrollUpButton onClick={() => window.scrollTo(0, 0)}>↑</ScrollUpButton>
    <Name>Lucas Lee</Name>
    <div></div>
    <Links>
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
  </FooterContainer>
)

const ScrollUpButton = styled.button`
  grid-column: 1/-1;
  justify-self: center;
  padding: 0.75rem;
  color: inherit;
  font-size: 1em;
  line-height: inherit;
  background: none;
  border: none;
  outline: none;
  appearance: none;

  &:hover {
    color: ${({ theme }) => theme.neutral.l15};
  }
`

const Name = styled.span`
  font-weight: 700;
`

const Links = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 50rem) {
    grid-column: span 2;
  }
`

const FooterContainer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin: 6rem 0 0 0;
  padding: 1.5rem 0 3rem 0;
  color: ${({ theme }) => theme.neutral.l65};

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;
  }
`

export default Footer
