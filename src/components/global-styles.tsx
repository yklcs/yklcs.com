import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-size: clamp(14px, 1.5vw, 18px);
    font-synthesis: none;
    background: #171718;
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    color: #e0e0e0;
    font-family: "Iosevka LL", "Basier Square", "Suisse Int'l", "Helvetica Neue", Helvetica, sans-serif;
    line-height: 1.7;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    *::selection {
      background: ${({ theme }) => theme.brand.l80};
    }
  }
`

export default GlobalStyle
