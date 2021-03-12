import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-size: clamp(14px, 3vw, 16px);
    background: #ffffff;
  }

  body {
    margin: 0;
    color: #000000;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;

    *::selection {
      background: rgba(100,100,100,0.2);
    }
  }
`

export default GlobalStyle
