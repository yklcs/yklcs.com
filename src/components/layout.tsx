import React, { FunctionComponent } from "react"
import { PageProps } from "gatsby"
import styled, { css, ThemeProvider } from "styled-components"
import "modern-normalize/modern-normalize.css"

import GlobalStyle from "./global-styles"
import Header from "./header"
import Footer from "./footer"
import theme from "../theme"

import "../fonts/public/fonts.css"
import respond from "../utils/responsive"

if (process.env.DISABLE_PRIVATE_FONTS !== "1") {
  require("../fonts/private/fonts.css")
}

const Layout = ({
  children,
  location,
  pageContext,
}: PageProps<object, object & { date: string }>) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <GlobalStyle />
      <Header location={location} />
    </Wrapper>
    {children}
    <Wrapper>
      <Footer buildDate={pageContext.date} />
    </Wrapper>
  </ThemeProvider>
)

const Wrapper = styled.div`
  display: grid;
  grid-template-columns:
    [full-start] minmax(1.5rem, 1fr)
    [main-start] minmax(0, 16rem)
    [narrow-start] minmax(0, 60ch) [narrow-end]
    minmax(0, 16rem) [main-end]
    minmax(1.5rem, 1fr) [full-end];
  line-height: 1.5;

  & > * {
    grid-column: main;
  }

  ${respond(
    "md",
    css`
      grid-template-columns:
        [full-start] minmax(1.5rem, 1fr)
        [main-start] 1fr
        [narrow-start] minmax(0, 60ch) [narrow-end]
        1fr [main-end]
        minmax(1.5rem, 1fr) [full-end];
    `
  )}
`

export default Layout
export { Wrapper }
