import React, { Dispatch, FunctionComponent, SetStateAction } from "react"
import styled, { css } from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import { groupBy } from "../utils/collections"
import { useState } from "react"
import { format, getYear } from "date-fns"
import { Wrapper } from "../components/layout"

interface PostNode {
  frontmatter: {
    title: string
    tags: string[]
    date: string
  }
  fields: {
    slug: string
  }
  timeToRead: number
}

interface BlogQueryData {
  allMdx: {
    nodes: PostNode[]
  }
}

type Group = "Year" | "Category"

const Blog: FunctionComponent = () => {
  const [group, setGroup] = useState<Group>("Year")

  const data: BlogQueryData = useStaticQuery(graphql`
    query BlogQuery {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            title
            tags
            date
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }
  `)

  const posts = data.allMdx.nodes.filter(node => !!node.frontmatter.date)

  return (
    <Wrapper
      css={css`
        margin: 2rem 0 0 0;
      `}
    >
      <Title>Blog</Title>
      <Sorter group={group} setGroup={setGroup} />
      <SEO title="Blog" description="Lucas's Blog" />
      {Object.entries(
        group === "Year"
          ? groupBy(posts, k =>
              getYear(new Date(k.frontmatter.date)).toString()
            )
          : groupBy(posts, k => k.frontmatter.tags[0])
      )
        .sort()
        .reverse()
        .map(n => {
          return <PostCollection group={n[0]} posts={n[1]} />
        })}
    </Wrapper>
  )
}

const PostCollection = ({
  group,
  posts,
}: {
  group: string
  posts: PostNode[]
}) => (
  <PostGroupContainer>
    <PostGroupName>{group}</PostGroupName>
    <PostGroup>
      {posts.map(node => (
        <PostLink
          title={node.frontmatter.title}
          tags={node.frontmatter.tags}
          date={new Date(node.frontmatter.date)}
          slug={node.fields.slug}
        />
      ))}
    </PostGroup>
  </PostGroupContainer>
)

const PostGroupName = styled.div`
  grid-column: span 2;
`

const PostGroupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin: 0 0 3rem 0;

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;
  }
`

interface PostLinkProps {
  title: string
  tags: string[]
  date: Date
  slug: string
}

const PostLink = ({ title, tags, date, slug }: PostLinkProps): JSX.Element => (
  <PostLinkContainer>
    <PostTitle to={slug}>{title}</PostTitle>
    <PostMeta>
      <PostDate>{format(date, "y/MM/dd")}</PostDate>—
      <PostTags>
        {tags.map((tag, i) => [i ? "·" : "", <span>{tag}</span>])}
      </PostTags>
    </PostMeta>
  </PostLinkContainer>
)

const PostGroup = styled.div`
  grid-column: span 2;
`

const PostMeta = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  gap: 0.75rem;
  color: ${({ theme }) => theme.neutral.l65};
  font-size: 1em;
  line-height: 1.5rem;
`

const PostDate = styled.time`
  font-variant-numeric: tabular-nums;
`

const PostTags = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  gap: 0.25rem;
`

const Title = styled.h1`
  /* grid-column: span 2; */
  margin: 0;
  font-weight: 500;
  font-size: 2em;
  letter-spacing: -0.02em;
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
  font-size: 1em;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.neutral.l15};
  }
`

const SorterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  margin: 0.75rem 0 3rem 0;
`

const Sorter = ({
  group,
  setGroup,
}: {
  group: Group
  setGroup: Dispatch<SetStateAction<Group>>
}) => (
  <SorterContainer>
    {
      <SorterButton active={group === "Year"} onClick={() => setGroup("Year")}>
        Year ↓
      </SorterButton>
    }
    <SorterButton
      active={group === "Category"}
      onClick={() => setGroup("Category")}
    >
      Category ↓
    </SorterButton>
  </SorterContainer>
)

const SorterButton = styled.button<{ active: boolean }>`
  display: ${({ active }) => (active ? "none" : "inline")};
  padding: 0;
  color: ${({ theme, active = false }) => theme.neutral.l65};
  font-size: 1em;
  line-height: inherit;
  letter-spacing: inherit;
  background: none;
  border: none;
  outline: none;
  appearance: none;

  &:hover {
    color: inherit;
  }
`

export default Blog
