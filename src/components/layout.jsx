import React, { useEffect } from "react"
import styled from "styled-components"

import GlobalStyle from "./globalstyles"
import "/src/fonts/fonts.css"

const Wrapper = styled.div`
  width: 100%;
  font-family: "Neue Montreal", sans-serif;
`

const Layout = ({ children }) => {
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
    </Wrapper>
  )
}

export default Layout
