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
    query Blog {
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
    .filter((node) => !!node.frontmatter.date)
    .map((node) => (
      <PostLink
        title={node.frontmatter.title}
        tags={node.frontmatter.tags}
        date={node.frontmatter.date}
        slug={node.slug}
        timeToRead={node.timeToRead}
      />
    ))

  return (
    <>
      <SEO title="Blog" description="Lucas's Blog" />
      <Title>Blog</Title>
      <PostsContainer>{posts}</PostsContainer>
    </>
  )
}

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
    <PostDate>{date}</PostDate>
    <PostTitle to={`/${slug}`}>{title}</PostTitle>
    <p>
      In{" "}
      {tags.map((tag) => (
        <Tag to={tag}>{tag}</Tag>
      ))}{" "}
      — {timeToRead} min. read
    </p>
  </PostLinkContainer>
)

const PostsContainer = styled.div`
  margin: 5rem 0;
`

const PostDate = styled.time`
  margin: 0.1rem 0;
  color: ${({ theme }) => theme.foreground.sub};
  font-variant-numeric: tabular-nums;
`

const Tag = styled.span<{ to: string }>`
  margin: 2rem 0.2rem;
  padding: 0.3rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.background.sub};
  border-radius: 0.5rem;
`

const Title = styled.h1`
  margin: 10rem 0 1rem 0;
  font-size: 3em;
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
  font-weight: 700;
  font-size: 1.5em;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.foreground.sub};
  }
`

export default Blog
