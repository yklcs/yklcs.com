import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Code from "./code"
import dateformat from "dateformat"

import "katex/dist/katex.min.css"

const Layout = ({ children, pageContext: { frontmatter } }) => (
  <>
    <Nav>
      <InternalLink to="/">
        <strong>luc.li</strong>
      </InternalLink>
      <div>
        <InternalLink to="/">Home</InternalLink>
        <Spacer />
        <InternalLink to="/blog">Blog</InternalLink>
      </div>
    </Nav>
    <Header>
      <Title>{frontmatter.title}</Title>
      <Metadata>
        <strong>By {frontmatter.author}</strong>
        <div style={{ color: "#a0a0a0" }}>
          <time dateTime={frontmatter.date}>
            {dateformat(new Date(frontmatter.date), "mmm dS, yyyy")}
          </time>
          <Spacer long />
          {frontmatter.tags[0]}
        </div>
      </Metadata>
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
  margin: 3rem auto;
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

const Spacer = styled.span`
  margin: 0 0.5em;

  &::after {
    content: ${(props) => (props.long ? `"—"` : `"·"`)};
  }
`

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* flex-direction: row;
  justify-content: space-between; */
  margin: 2rem 0;
  line-height: 1.5;
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

const components = {
  h1: Title,
  pre: (props) => <div {...props} />,
  code: Code,
  p: Paragraph,
}

export default Layout
