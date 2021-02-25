import React from "react"
import styled from "styled-components"

import GlobalStyle from "./globalstyles"
import "/src/fonts/fonts.css"

const Wrapper = styled.div`
  width: 100%;
  font-family: Inter, sans-serif;
`

const Layout = ({ children }) => (
  <Wrapper>
    <GlobalStyle />
    {children}
  </Wrapper>
)

export default Layout
