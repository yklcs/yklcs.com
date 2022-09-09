import React from "react"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"

import Link, { InternalLink } from "./links"
import respond from "../utils/responsive"

const Header = ({ location }: { location: WindowLocation }): JSX.Element => (
  <HeaderContainer>
    <Title as={location.pathname === "/" ? "h1" : "span"}>
      <Link to="/" $underline={false} rel="author">
        Lucas Yunkyu Lee
      </Link>
    </Title>
    <div
      css={css`
        display: flex;
        flex-direction: row;
        ${respond(
          "sm",
          css`
            display: none;
          `
        )}
      `}
    >
      <Breadcrumbs
        css={css`
          color: ${({ theme }) => theme.neutral.l65};
          font-size: 0.8em;
          font-family: monospace;

          & > a:hover {
            color: ${({ theme }) => theme.neutral.l50};
          }
        `}
        location={location}
      />
    </div>
  </HeaderContainer>
)

const Title = styled.h1`
  margin: 0 0 0 -0.01em;
  font-weight: 500;
  font-size: 1.125em;
  letter-spacing: -0.015em;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
`

const Breadcrumbs = ({ location, ...props }: { location: WindowLocation }) => (
  <BreadcrumbsContainer {...props}>
    <InternalLink $underline={false} to="/">
      /
    </InternalLink>
    {location.pathname
      .split("/")
      .filter(str => str)
      .map((elm, idx, arr) => (
        <>
          {idx !== 0 && <span>/</span>}
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
  gap: 0 0.375rem;
`

export default Header
