import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-size: clamp(10px, 3vw, 16px);
  }

  body {
    margin: 0;
  }
`

export default GlobalStyle
