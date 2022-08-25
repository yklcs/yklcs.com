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

const Layout: FunctionComponent<PageProps> = ({ children, location }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <GlobalStyle />
      <Header location={location} />
    </Wrapper>
    {children}
    <Wrapper>
      <Footer />
    </Wrapper>
  </ThemeProvider>
)

const Wrapper = styled.div`
  display: grid;
  grid-template-columns:
    [full-start] minmax(1.5rem, 1fr)
    [wide-start] minmax(0, 6rem)
    [main-start] minmax(0, 90rem) [main-end]
    minmax(0, 6rem) [wide-end]
    minmax(1.5rem, 1fr) [full-end];
  line-height: 1.5;

  & > * {
    grid-column: main;
  }

  ${respond(
    "lg",
    css`
      grid-template-columns:
        [full-start] minmax(3rem, 1fr)
        [wide-start] minmax(0, 3rem)
        [main-start] minmax(0, 90rem) [main-end]
        minmax(0, 3rem) [wide-end]
        minmax(3rem, 1fr) [full-end];
    `
  )}

  ${respond(
    "md",
    css`
      grid-template-columns:
        [full-start] minmax(1.5rem, 1fr)
        [wide-start] 0
        [main-start] minmax(0, 90rem) [main-end]
        0 [wide-end]
        minmax(1.5rem, 1fr) [full-end];
    `
  )}
`

export default Layout
export { Wrapper }
