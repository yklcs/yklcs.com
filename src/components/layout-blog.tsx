import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Link, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Code from "./code"
import { format } from "date-fns"

import SEO from "./seo"
import "katex/dist/katex.min.css"

interface BlogFrontmatter {
  title: string
  date: string
  tags: string[]
  author: string
}

const Layout: FunctionComponent<
  PageProps<null, { frontmatter: BlogFrontmatter }, null>
> = ({ children, pageContext: { frontmatter } }) => (
  <>
    <SEO
      title={frontmatter.title}
      article
      date={frontmatter.date}
      tags={frontmatter.tags}
    />
    <MDXProvider components={components}>
      <Thing>
        <BlogWrapper>
          <Header>
            <Title>{frontmatter.title}</Title>
            {/* <strong>{frontmatter.author}</strong> */}
            <MetaData>
              <time dateTime={frontmatter.date}>
                {format(new Date(frontmatter.date), "y/MM/dd")}
              </time>
              <Spacer long />
              {frontmatter.tags[0]}
            </MetaData>
          </Header>
          <Content>{children}</Content>
        </BlogWrapper>
      </Thing>
    </MDXProvider>
  </>
)

const Thing = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;

  @media screen and (max-width: 45rem) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;
  }
`

const BlogWrapper = styled.div`
  grid-column: 2/4;

  @media screen and (max-width: 65rem) {
    grid-column: 1/4;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0;
  line-height: 1;

  @media screen and (max-width: 60rem) {
    flex-wrap: wrap;
  }
`

const Spacer = styled.span<{ long: boolean }>`
  margin: 0 0.5em;

  &::after {
    content: ${({ long }) => (long ? `"—"` : `"·"`)};
  }
`

const lineHeight = 1.8

const Content = styled.div`
  font-size: 1.25em;
  line-height: ${lineHeight}rem;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 3rem 0 0 0;
  line-height: 1.5;
`

const MetaData = styled.div`
  color: ${({ theme }) => theme.neutral.l65};
`

const Title = styled.h1`
  margin: 1.5rem 0;
  font-weight: 700;
  font-size: 2.5em;
  line-height: 3rem;
  letter-spacing: -0.022em;
`

const Paragraph = styled.p`
  margin: 0 0 ${lineHeight}rem 0;
  font-family: "XCharter", serif;
  letter-spacing: 0;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`

const Pre = styled.pre`
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
    monospace;
`

const InlineCode = styled.code`
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
    monospace;
  background: ${({ theme }) => theme.neutral.l100};
`

const typeScale = 1.2

const H2 = styled.h2`
  margin: ${lineHeight * 2}rem 0 0 0;
  font-weight: 700;
  font-size: ${typeScale ** 2}em;
  line-height: ${lineHeight * 3}rem;
`

const H3 = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: ${typeScale}em;
  line-height: ${lineHeight * 2}rem;
`

const H4 = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 1em;
  line-height: ${lineHeight * 2}rem;
`

const components = {
  h1: Title,
  h2: H2,
  h3: H3,
  h4: H4,
  pre: Pre,
  code: Code,
  inlineCode: InlineCode,
  p: Paragraph,
  Link,
}

export default Layout
