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
    <Header>
      <Title>{frontmatter.title}</Title>
      <Meta>
        <strong>By {frontmatter.author}</strong>
        <MetaData>
          <time dateTime={frontmatter.date}>
            {format(new Date(frontmatter.date), "yyyy/mm/dd")}
          </time>
          <Spacer long />
          {frontmatter.tags[0]}
        </MetaData>
      </Meta>
    </Header>
    <MDXProvider components={components}>
      <Thing>
        <BlogWrapper>{children}</BlogWrapper>
      </Thing>
    </MDXProvider>
  </>
)

const Thing = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;

  @media screen and (max-width: 50rem) {
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
  margin: 7rem 0;
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

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 2rem 0;
  line-height: 1.5;
`

const MetaData = styled.div`
  color: ${({ theme }) => theme.neutral.l65};
`

const Title = styled.h1`
  max-width: 10em;
  margin: 0;
  font-weight: 700;
  font-size: 3.5rem;
  letter-spacing: -0.06em;
`

const Paragraph = styled.p`
  font-size: 1.2em;
  font-family: "XCharter", serif;
  line-height: 1.68rem;
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

const components = {
  h1: Title,
  pre: Pre,
  code: Code,
  inlineCode: InlineCode,
  p: Paragraph,
  Link,
}

export default Layout
