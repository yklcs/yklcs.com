import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-size: clamp(14px, 3vw, 16px);
    background: ${({ theme }) => theme.background.default};
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.foreground.default};
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;

    *::selection {
      background: ${({ theme }) => theme.background.selection};
    }
  }
`

export default GlobalStyle
