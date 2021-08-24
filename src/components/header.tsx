import React from "react"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"

import { InternalLink } from "./links"

const Header = ({ location }: { location: WindowLocation }): JSX.Element => (
  <HeaderContainer>
    <Breadcrumbs location={location} />
  </HeaderContainer>
)

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
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
