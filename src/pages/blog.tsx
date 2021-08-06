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
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            title
            tags
            date(formatString: "LL")
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
      />
    ))

  return (
    <Layout>
      <Title>Blog</Title>
      <SEO title="Blog" description="Lucas's Blog" />
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
}

const PostLink = ({ title, tags, date, slug }: PostLinkProps): JSX.Element => (
  <PostLinkContainer>
    <PostTag>{tags[0]}</PostTag>
    <PostTitle to={`/${slug}`}>{title}</PostTitle>
    <PostDate>{date}</PostDate>
  </PostLinkContainer>
)

const Posts = styled.div`
  grid-column: span 2;
`

const PostDate = styled.time`
  margin: 0.1rem 0;
  color: ${({ theme }) => theme.neutral.l65};
  font-variant-numeric: tabular-nums;
  font-size: 0.9em;
`

const PostTag = styled.span`
  color: ${({ theme }) => theme.neutral.l65};
  font-weight: 700;
  font-size: 0.75em;
  letter-spacing: 0.01em;
  text-transform: uppercase;
`

const Title = styled.h1`
  grid-column: span 2;
  margin: 0;
  font-size: 2em;
`

const PostLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 2rem 0;
  color: inherit;
  text-decoration: none;
`

const PostTitle = styled(Link)`
  display: block;
  margin: 0;
  color: inherit;
  font-weight: 700;
  font-size: 1.2em;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.neutral.l15};
  }
`

export default Blog
