import styled, { css } from "styled-components"
import Code from "./code"
import { ExternalLink, InternalLink } from "./links"
import { StaticImage } from "gatsby-plugin-image"
import { Components } from "@mdx-js/react/lib"
import respond from "../utils/responsive"

const typeScale = 1.125

const Title = styled.h1`
  margin: 1rem 0 0.5rem;
  font-weight: 700;
  font-size: 2em;
  letter-spacing: -0.022em;
`

const mdxComponents: Components = {}

mdxComponents.h1 = Title

mdxComponents.p = styled.p`
  margin: 0 0 1rem;
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
  background: ${({ theme }) => theme.colors.subbg};
`

const headerStyle = css`
  font-weight: 700;
`

mdxComponents.h2 = styled.h2`
  margin: 2rem 0 1rem;
  font-size: ${typeScale ** 2}em;
  letter-spacing: -0.03em;
  ${headerStyle}
`

mdxComponents.h3 = styled.h3`
  margin: 2rem 0 1rem;
  font-size: ${typeScale}em;
  letter-spacing: -0.025em;
  ${headerStyle}
`

mdxComponents.h4 = styled.h4`
  margin: 2rem 0 1rem;
  font-weight: 700;
  font-size: 1em;
  ${headerStyle}
`

mdxComponents.a = ExternalLink

const components: Components = {
  ...mdxComponents,
  // Sidenote,
  ExternalLink,
  InternalLink,
  StaticImage,
}

export { Title, components }
