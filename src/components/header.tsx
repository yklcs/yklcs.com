import React from "react"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"

import { InternalLink } from "./links"

const Header = ({ location }: { location: WindowLocation }): JSX.Element => (
  <HeaderContainer>
    <Breadcrumbs location={location} />
    <Links>
      <InternalLink to="/blog" $underline={false}>
        Blog
      </InternalLink>
      <InternalLink to="/resume" $underline={false}>
        Resume
      </InternalLink>
    </Links>
  </HeaderContainer>
)

const Links = styled.div`
  display: flex;
  * {
    margin: 0 0 0 0.75rem;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1.5rem 0;
`

const Breadcrumbs = ({ location }: { location: WindowLocation }) => (
  <BreadcrumbsContainer>
    <InternalLink
      css={css`
        color: ${({ theme }) => theme.brand.l50};
      `}
      $underline={false}
      to="/"
    >
      luc.li
    </InternalLink>
    {location.pathname
      .split("/")
      .filter(str => str)
      .map((elm, idx, arr) => (
        <>
          <span
            css={css`
              color: ${({ theme }) => theme.neutral.l65};
            `}
          >
            /
          </span>
          <InternalLink
            $underline={false}
            to={`/${arr.slice(0, idx + 1).join("/")}`}
          >
            {elm}
          </InternalLink>
        </>
      ))}
  </BreadcrumbsContainer>
)

const BreadcrumbsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

export default Header
