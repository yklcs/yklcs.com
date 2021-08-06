import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"

interface BlogQueryData {
  allMdx: {
    nodes: {
      frontmatter: {
        title: string
        tags: string[]
        date: string
      }
      slug: string
      timeToRead: number
    }[]
  }
}

const Blog: FunctionComponent = () => {
  const data: BlogQueryData = useStaticQuery(graphql`
    query BlogQuery {
      allMdx {
        nodes {
          frontmatter {
            title
            tags
            date(formatString: "YYYY/MM/DD")
          }
          slug
          timeToRead
        }
      }
    }
  `)

  const posts = data.allMdx.nodes
    .filter(node => !!node.frontmatter.date)
    .map(node => (
      <PostLink
        title={node.frontmatter.title}
        tags={node.frontmatter.tags}
        date={node.frontmatter.date}
        slug={node.slug}
        timeToRead={node.timeToRead}
      />
    ))

  return (
    <Layout>
      <SEO title="Blog" description="Lucas's Blog" />
      <Title>Blog</Title>
      <Posts>{posts}</Posts>
    </Layout>
  )
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin: 6rem 0 0 0;

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem 1rem;
  }
`

interface PostLinkProps {
  title: string
  tags: string[]
  date: string
  slug: string
  timeToRead: number
}

const PostLink: FunctionComponent<PostLinkProps> = ({
  title,
  tags,
  date,
  slug,
  timeToRead,
}) => (
  <PostLinkContainer>
    <PostTitle to={`/${slug}`}>{title}</PostTitle>
    <PostDate>{date}</PostDate>
    <p>
      In{" "}
      {tags.map(tag => (
        <Tag to={tag}>{tag}</Tag>
      ))}{" "}
      — {timeToRead} min. read
    </p>
  </PostLinkContainer>
)

const Posts = styled.div`
  grid-column: span 3;
`

const PostDate = styled.time`
  margin: 0.1rem 0;
  color: ${({ theme }) => theme.neutral.l65};
  font-variant-numeric: tabular-nums;
`

const Tag = styled.span<{ to: string }>`
  margin: 2rem 0.2rem;
  padding: 0.3rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.neutral.l65};
  border-radius: 0.5rem;
`

const Title = styled.h1`
  font-size: 2em;
`

const PostLinkContainer = styled.div`
  margin: 2rem 0;
  color: inherit;
  text-decoration: none;
`

const PostTitle = styled(Link)`
  display: block;
  margin: 0;
  color: inherit;
  font-weight: 400;
  font-size: 1.2em;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.neutral.l15};
  }
`

export default Blog
