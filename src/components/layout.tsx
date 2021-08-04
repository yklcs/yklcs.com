import React, { FunctionComponent } from "react"
import styled, { ThemeProvider } from "styled-components"
import "modern-normalize/modern-normalize.css"

import GlobalStyle from "./global-styles"
import Footer from "./footer"
import "/src/fonts/fonts.css"
import theme from "../theme"
import { PageProps } from "gatsby"

const Layout: FunctionComponent<PageProps> = ({ children, location }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <GlobalStyle />
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

export default Layout
