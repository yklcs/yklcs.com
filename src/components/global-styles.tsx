import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-size: clamp(14px, 1.125vw, 18px);
    font-synthesis: none;
    background: ${({ theme }) => theme.colors.bg};
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-family: Diatype, "Helvetica Neue", Helvetica, sans-serif;
    line-height: 1.75;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    *::selection {
      background: ${({ theme }) => theme.colors.subbg};
    }
  }
`

export default GlobalStyle
