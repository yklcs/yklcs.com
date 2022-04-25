import React from "react"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"

import Link, { InternalLink } from "./links"
import respond from "../utils/responsive"

const Header = ({ location }: { location: WindowLocation }): JSX.Element => (
  <HeaderContainer>
    {/* <Breadcrumbs location={location} /> */}
    <Title>Lucas Yunkyu Lee</Title>
    <HeaderLinks>
      <Link to="/blog" $underline={false}>
        Blog
      </Link>
      <Link to="/resume" $underline={false}>
        Resume
      </Link>
    </HeaderLinks>
  </HeaderContainer>
)

const Title = styled.h1`
  font-weight: 400;
  font-size: 1em;
  letter-spacing: -0.015em;
  margin: 0 0 0 -0.01em;
`

const HeaderLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${respond(
    "sm",
    css`
      display: none;
    `
  )}
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;
  font-size: 1.125em;

  ${respond(
    "sm",
    css`
      gap: 1rem;
      margin: 1.5rem 0;
      flex-direction: column;
    `
  )}
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
