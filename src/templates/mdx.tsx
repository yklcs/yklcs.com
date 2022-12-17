import React, { FunctionComponent } from "react"
import { PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import SEO from "../components/seo"
import "katex/dist/katex.min.css"
import { Content, Header } from "../components/mdx-page"
import { components } from "../components/mdx-components"
import { Wrapper } from "../components/layout"
import { css } from "styled-components"

interface MdxFrontmatter {
  title: string
  date?: string
  tags?: string[]
  description: string
}

const MdxLayout: FunctionComponent<
  PageProps<null, { frontmatter: MdxFrontmatter }, null>
> = ({ children, pageContext: { frontmatter } }) => {
  return (
    <>
      <SEO
        title={frontmatter.title}
        article
        date={frontmatter.date}
        tags={frontmatter.tags}
      />
      <MDXProvider components={components}>
        <Wrapper
          as="article"
          css={css`
            line-height: inherit;
          `}
        >
          <Header {...frontmatter} />
          <Content>{children}</Content>
        </Wrapper>
      </MDXProvider>
    </>
  )
}

export { MdxFrontmatter }
export default MdxLayout
