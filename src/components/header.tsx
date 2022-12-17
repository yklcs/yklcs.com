import React from "react"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"

import Link, { InternalLink } from "./links"
import respond from "../utils/responsive"

const Header = ({ location }: { location: WindowLocation }): JSX.Element => (
  <HeaderContainer>
    <Title as={location.pathname === "/" ? "h1" : "span"}>
      <Link to="/" $underline={false} rel="author">
        luc.li
      </Link>
    </Title>

    {location.pathname !== "/" && (
      <Breadcrumbs
        css={css`
          color: ${({ theme }) => theme.neutral.l65};

          & > a:hover {
            color: ${({ theme }) => theme.neutral.l50};
          }

          ${respond(
            "sm",
            css`
              display: none;
            `
          )}
        `}
        location={location}
      />
    )}
  </HeaderContainer>
)

const Title = styled.h1`
  margin: 0 0 0 -0.01em;
  font-weight: 700;
  font-size: 1em;
  letter-spacing: -0.015em;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.25em;
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
  margin: 0 0 0 0.375rem;
`

export default Header
