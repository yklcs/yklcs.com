import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-size: clamp(16px, 1vw, 20px);
    font-synthesis: none;
    background: ${({ theme }) => theme.neutral.l100};
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.neutral.l15};
    font-family: "Suisse Int'l", "Helvetica Neue", Helvetica, sans-serif;

    /* font-family: "Diatype", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    *::selection {
      background: ${({ theme }) => theme.brand.l80};
    }
  }
`

export default GlobalStyle
