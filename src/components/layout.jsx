import React from "react"
import styled from "styled-components"

import "/src/fonts/fonts.css"

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`

const Layout = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

export default Layout