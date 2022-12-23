import React from "react"
import { PageProps } from "gatsby"
import styled, { css, ThemeProvider } from "styled-components"
import "modern-normalize/modern-normalize.css"

import GlobalStyle from "./global-styles"
import Header from "./header"
import Footer from "./footer"
import theme from "../theme"

import "../fonts/public/fonts.css"
import respond from "../utils/responsive"

if (process.env.DISABLE_PRIVATE_FONTS !== "1") {
  require("../fonts/private/fonts.css")
}

const Layout = ({
  children,
  location,
  pageContext,
}: PageProps<object, object & { date: string }>) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 5rem 0 0;
    `}
  >
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle />
        <Header location={location} />
      </Wrapper>
      {children}
      <Wrapper
        css={css`
          margin: 5rem 0 0;
          padding: 0.5rem 0;
          border-top: 1px solid ${({ theme }) => theme.colors.subbg};
        `}
      >
        <Footer buildDate={pageContext.date} />
      </Wrapper>
    </ThemeProvider>
  </div>
)

const mainWidth = `${1.25 * 56}ch`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns:
    [full-start] minmax(3rem, 1fr)
    [wide-start] minmax(0, 18rem)
    [main-start] ${mainWidth} [main-end]
    minmax(0, 18rem) [wide-end]
    minmax(3rem, 1fr) [full-end];

  & > * {
    grid-column: main;
  }

  ${respond(
    "md",
    css`
      grid-template-columns:
        [full-start] 3rem
        [wide-start] 1fr
        [main-start] minmax(0, ${mainWidth}) [main-end]
        1fr [wide-end]
        3rem [full-end];
    `
  )}

  ${respond(
    "sm",
    css`
      grid-template-columns:
        [full-start] 1.5rem
        [wide-start] 1fr
        [main-start] minmax(0, ${mainWidth}) [main-end]
        1fr [wide-end]
        1.5rem [full-end];
    `
  )}
`

export default Layout
export { Wrapper }
