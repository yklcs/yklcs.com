import React, { useEffect } from "react"
import styled from "styled-components"

import GlobalStyle from "./globalstyles"
import Footer from "./footer"
import "/src/fonts/fonts.css"

const Wrapper = styled.div`
  max-width: 60em;
  margin: auto;
  padding: 0rem 2rem;
  font-family: "Neue Montreal", sans-serif;
`

const Layout = ({ children, location }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--100vh",
      `${window.innerHeight}px`
    )
  }, [])

  return (
    <Wrapper>
      <GlobalStyle />
      {children}
      <Footer location={location} />
    </Wrapper>
  )
}

export default Layout
