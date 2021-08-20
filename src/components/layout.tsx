import React, { FunctionComponent } from "react"
import { PageProps } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import "modern-normalize/modern-normalize.css"

import GlobalStyle from "./global-styles"
import Header from "./header"
import Footer from "./footer"
import theme from "../theme"

import "../fonts/public/fonts.css"

if (process.env.DISABLE_PRIVATE_FONTS !== "1") {
  require("../fonts/private/fonts.css")
}

const Layout: FunctionComponent<PageProps> = ({ children, location }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <GlobalStyle />
      <Header location={location} />
      {children}
      <Footer />
    </Wrapper>
  </ThemeProvider>
)

const Wrapper = styled.div`
  max-width: 80em;
  margin: auto;
  padding: 0 1.5rem;
  font-family: "Inter", sans-serif;
  line-height: 1.5;
  letter-spacing: -0.05em;

  @media screen and (max-width: 50rem) {
    padding: 0 1rem;
  }
`

export default Layout
