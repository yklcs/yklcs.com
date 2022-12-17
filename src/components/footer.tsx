import React from "react"
import styled, { css } from "styled-components"
import respond from "../utils/responsive"
import { ExternalLink, InternalLink } from "./links"

const Footer = ({ buildDate }: { buildDate: string }): JSX.Element => (
  <FooterContainer>
    {/* <SiteInfo>
      <Copyright>© Lucas Lee 2022</Copyright>
      <Links>
        <InternalLink to="/" $underline={false}>
          Home{" "}
        </InternalLink>
        {" · "}
        <InternalLink to="/colophon" $underline={false}>
          Colophon
        </InternalLink>
        {" · "}
        <ExternalLink href="https://github.com/yklcs/luc.li" $underline={false}>
          Site source
        </ExternalLink>
      </Links>
    </SiteInfo> */}
    <span>
      Site built at <time dateTime={buildDate}>{buildDate}</time>
    </span>
  </FooterContainer>
)

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 0 0;
`

const SiteInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;

  ${respond(
    "md",
    css`
      flex-direction: column-reverse;
    `
  )}
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

  /* border-bottom: 1px solid ${({ theme }) => theme.neutral.l95}; */
`

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  color: ${({ theme }) => theme.neutral.l65};
  font-size: 0.8em;
  line-height: 1rem;
`

export default Footer
