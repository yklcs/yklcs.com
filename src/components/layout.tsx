import React, { FunctionComponent, useEffect } from "react"
import styled, { ThemeProvider } from "styled-components"
import "modern-normalize/modern-normalize.css"

import GlobalStyle from "./global-styles"
import Footer from "./footer"
import "/src/fonts/fonts.css"
import theme from "../theme"
import { PageProps } from "gatsby"

const Layout: FunctionComponent<PageProps> = ({ children, location }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--100vh",
      `${window.innerHeight}px`
    )
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle />
        {children}
        <Footer location={location} />
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  max-width: 60em;
  margin: auto;
  padding: 0rem 2rem;
  font-family: "Inter", sans-serif;
  letter-spacing: -0.05em;
`

export default Layout
