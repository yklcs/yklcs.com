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
    <Nav>
      <InternalLink to="/">
        <strong>luc.li</strong>
      </InternalLink>
      <div>
        <InternalLink to="/blog">Blog</InternalLink>
      </div>
    </Nav>
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
      <BlogWrapper>{children}</BlogWrapper>
    </MDXProvider>
  </>
)

const InternalLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const BlogWrapper = styled.div`
  position: relative;
  max-width: 40rem;
  margin: 0 auto 10rem auto;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em 0;
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
  line-height: 1.5;
  letter-spacing: -0.2px;
  -webkit-font-smoothing: auto;
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
