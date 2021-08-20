import { MDXProviderComponentsProp } from "@mdx-js/react"
import styled, { css } from "styled-components"
import Code from "./code"
import { ExternalLink, InternalLink } from "./links"
import { StaticImage } from "gatsby-plugin-image"

const lineHeight = 1.8
const typeScale = 1.2

const Title = styled.h1`
  margin: ${lineHeight}rem 0 ${lineHeight / 2}rem 0;
  font-weight: 700;
  font-size: 2.5em;
  font-family: XCharter, serif;
  line-height: ${lineHeight * 1.5}rem;
  letter-spacing: -0.022em;
`

const mdxComponents: MDXProviderComponentsProp = {}

mdxComponents.h1 = Title

mdxComponents.p = styled.p`
  margin: 0 0 ${lineHeight}rem 0;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`

mdxComponents.pre = styled.pre`
  font-family: Iosevka, Menlo, Consolas, monospace;
`

mdxComponents.code = Code

mdxComponents.inlineCode = styled.code`
  font-family: Iosevka, Menlo, Consolas, monospace;
  background: ${({ theme }) => theme.neutral.l100};
`

const headerStyle = css`
  font-weight: 700;
  font-family: "Suisse Int'l", "Helvetica Neue", Helvetica, Arial, sans-serif;
`

mdxComponents.h2 = styled.h2`
  margin: ${lineHeight * 2}rem 0 0 0;
  font-size: ${typeScale ** 2}em;
  line-height: ${lineHeight * 3}rem;
  letter-spacing: -0.03em;
  ${headerStyle}

  &:first-of-type {
    margin: 0;
  }
`

mdxComponents.h3 = styled.h3`
  margin: 0;
  font-size: ${typeScale}em;
  line-height: ${lineHeight * 2}rem;
  letter-spacing: -0.025em;
  ${headerStyle}
`

mdxComponents.h4 = styled.h4`
  margin: 0;
  font-size: 1em;
  line-height: ${lineHeight * 2}rem;
  letter-spacing: -0.02em;
  ${headerStyle}
`

mdxComponents.a = ExternalLink

const Sidenote = styled.span`
  position: absolute;
  right: 0;
  display: block;
  width: 50%;
  margin: -${lineHeight}rem 0 0 0;
  padding: 0 0 0 2rem;
  color: ${({ theme }) => theme.neutral.l65};
  font-size: 0.75em;
  font-family: "Suisse Int'l", "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: ${lineHeight}rem;
  letter-spacing: -0.012em;
  transform: translateX(100%);

  @media screen and (max-width: 65rem) {
    width: 33%;
  }

  @media screen and (max-width: 50rem) {
    display: none;
  }
`

const components = {
  ...mdxComponents,
  Sidenote,
  ExternalLink,
  InternalLink,
  StaticImage,
}

export { Title, lineHeight, components }
