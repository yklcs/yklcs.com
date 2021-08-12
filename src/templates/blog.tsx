import React, { FunctionComponent } from "react"
import { PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import SEO from "../components/seo"
import "katex/dist/katex.min.css"
import { Content, Header, Layout, Wrapper } from "../components/mdx-page"
import { components } from "../components/mdx"

interface BlogFrontmatter {
  title: string
  date: string
  tags: string[]
  author: string
  description: string
  large?: boolean
  image?: string
}

const BlogLayout: FunctionComponent<
  PageProps<null, { frontmatter: BlogFrontmatter }, null>
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
        <Layout>
          <Header type="Blog" {...frontmatter} />
          <Wrapper>
            <Content>{children}</Content>
          </Wrapper>
        </Layout>
      </MDXProvider>
    </>
  )
}

export { BlogFrontmatter }
export default BlogLayout
