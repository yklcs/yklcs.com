import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query Blog {
      allMdx {
        edges {
          node {
            id
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
    }
  `)

  const posts = data.allMdx.edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      <PostLink
        title={edge.node.frontmatter.title}
        tags={edge.node.frontmatter.tags}
        date={edge.node.frontmatter.date}
        slug={edge.node.slug}
        timeToRead={edge.node.timeToRead}
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

const PostLink = ({ title, tags, date, slug, timeToRead }) => (
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

const Tag = styled.span`
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
