import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-size: clamp(14px, 3vw, 16px);
    background: ${({ theme }) => theme.neutral.l100};
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.neutral.l15};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    *::selection {
      background: ${({ theme }) => theme.brand.l80};
    }
  }
`

export default GlobalStyle
