import React, { FunctionComponent } from "react"
import styled, { css, ThemeProvider } from "styled-components"
import "modern-normalize/modern-normalize.css"

import GlobalStyle from "./global-styles"
import Footer from "./footer"
import "/src/fonts/fonts.css"
import theme from "../theme"
import { PageProps } from "gatsby"
import { WindowLocation } from "@reach/router"
import { InternalLink } from "./links"

const Layout: FunctionComponent<PageProps> = ({ children, location }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <GlobalStyle />
      <Header>
        <Breadcrumbs location={location} />
      </Header>
      {children}
      <Footer location={location} />
    </Wrapper>
  </ThemeProvider>
)

const Wrapper = styled.div`
  max-width: 80em;
  margin: auto;
  padding: 0rem 1rem;
  font-family: "Inter", sans-serif;
  line-height: 1.5;
  letter-spacing: -0.05em;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.5rem 0;
`

const Breadcrumbs = ({ location }: { location: WindowLocation }) => (
  <BreadcrumbsContainer>
    <InternalLink
      css={css`
        color: ${({ theme }) => theme.foreground.highlight};
      `}
      underline={false}
      to="/"
    >
      luc.li
    </InternalLink>
    {location.pathname
      .split("/")
      .filter(str => str)
      .map((elm, idx, arr) => (
        <>
          <span style={{ color: "#cccccc" }}>/</span>
          <InternalLink
            underline={false}
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

export default Layout
