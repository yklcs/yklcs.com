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
  description: string
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
            <Category>{frontmatter.tags[0]}</Category>
            <Title>{frontmatter.title}</Title>
            <Description>{frontmatter.description}</Description>
            <MetaData>
              <div>
                <span>By {frontmatter.author} on </span>
                <DateTime dateTime={frontmatter.date}>
                  {format(new Date(frontmatter.date), "PP")}
                </DateTime>
              </div>
              <Tags>
                {frontmatter.tags.map((tag, i) => [
                  i ? "·" : "",
                  <span>{tag}</span>,
                ])}
              </Tags>
            </MetaData>
          </Header>
          <Content>{children}</Content>
        </BlogWrapper>
      </Thing>
    </MDXProvider>
  </>
)

const DateTime = styled.time`
  font-variant-numeric: tabular-nums;
`

const Tags = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  gap: 0.25rem;
`

const Category = styled.div`
  color: ${({ theme }) => theme.neutral.l65};
  font-weight: 700;
  font-size: 0.9em;
  letter-spacing: 0.1ch;
  text-transform: uppercase;
`

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

const lineHeight = 1.8

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${lineHeight * 3}rem 0 ${lineHeight * 1}rem;

  @media screen and (max-width: 60rem) {
    flex-wrap: wrap;
  }
`

const Content = styled.div`
  position: relative;
  font-size: 1.25em;
  line-height: ${lineHeight}rem;
`

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${lineHeight}rem 0;
  color: ${({ theme }) => theme.neutral.l65};
  line-height: ${lineHeight};
`

const Title = styled.h1`
  margin: ${lineHeight}rem 0 ${lineHeight / 2}rem 0;
  font-weight: 700;
  font-size: 2.5em;
  font-family: XCharter, serif;
  line-height: ${lineHeight * 1.5}rem;
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

const Description = styled.p`
  margin: 0;
  font-size: ${typeScale}em;
  line-height: ${lineHeight}rem;
`

const H2 = styled.h2`
  margin: ${lineHeight * 2}rem 0 0 0;
  font-weight: 700;
  font-size: ${typeScale ** 2}em;
  line-height: ${lineHeight * 3}rem;

  &:first-of-type {
    margin: 0;
  }
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

const Sidenote = styled.span`
  position: absolute;
  right: 0;
  display: block;
  width: 50%;
  margin: -${lineHeight}rem 0 0 0;
  padding: 0 0 0 2rem;
  color: ${({ theme }) => theme.neutral.l65};
  font-size: 0.75em;
  font-family: Inter, sans-serif;
  line-height: ${lineHeight};
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
  h1: Title,
  h2: H2,
  h3: H3,
  h4: H4,
  pre: Pre,
  code: Code,
  inlineCode: InlineCode,
  p: Paragraph,
  Link,
  Sidenote,
}

export default Layout
