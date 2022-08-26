import React from "react"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"

import Link, { InternalLink } from "./links"
import respond from "../utils/responsive"

const Header = ({ location }: { location: WindowLocation }): JSX.Element => (
  <HeaderContainer>
    {/* <Breadcrumbs location={location} /> */}
    <Link
      to="/"
      $underline={false}
      style={{
        justifySelf: "start",
      }}
    >
      <Title>Lucas Yunkyu Lee</Title>
    </Link>
    <div
      css={css`
        display: flex;
        flex-direction: row;

        /* justify-content: space-between; */
        ${respond(
          "sm",
          css`
            display: none;
          `
        )}
      `}
    >
      <HeaderLinks>
        {/* <Link to="/blog" $underline={false}>
          Blog
        </Link>
        <Link to="/resume" $underline={false}>
          Resume
        </Link>
     
        <Link to="https://github.com/rocketll" $underline={false}>
          Github
        </Link>
        <Link to="https://instagram.com/yklcs" $underline={false}>
          Instagram
        </Link> */}
      </HeaderLinks>
      <span
        css={css`
          color: blue;
        `}
      >
        ⬤
      </span>
      {/* <Breadcrumbs location={location} /> */}
    </div>
  </HeaderContainer>
)

const Title = styled.h1`
  margin: 0 0 0 -0.01em;
  font-weight: 600;
  font-size: 1.125em;
  letter-spacing: -0.015em;
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
  padding: 2rem 0;
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
      /
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
