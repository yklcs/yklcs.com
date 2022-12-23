import React, { Dispatch, FunctionComponent, SetStateAction } from "react"
import styled, { css } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import { groupBy } from "../utils/collections"
import { useState } from "react"
import { format, getYear } from "date-fns"
import { Wrapper } from "../components/layout"
import { InternalLink } from "../components/links"

interface PostNode {
  frontmatter: {
    title: string
    tags: string[]
    date: string
  }
  fields: {
    slug: string
  }
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
      allMdx(
        filter: { internal: { contentFilePath: { glob: "**/blog/**" } } }
      ) {
        nodes {
          frontmatter {
            title
            tags
            date
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const posts = data.allMdx.nodes.filter(node => !!node.frontmatter.date)

  return (
    <Wrapper
      css={css`
        margin: 2rem 0 0;
      `}
    >
      <Title>Blog</Title>
      <Sorter group={group} setGroup={setGroup} />
      <SEO title="Blog" description="Lucas's Blog" />
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
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
      </div>
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

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 2em;
`

const PostGroupName = styled.div`
  margin: 0 0 1em;
  font-weight: 700;
  font-size: 1.25em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subbg};
`

const PostGroupContainer = styled.div`
  padding: 1em 0;
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
      <PostDate>{format(date, "y-MM-dd")}</PostDate>
      <PostTags>
        {tags.map((tag, i) => [i ? "·" : "", <span>{tag}</span>])}
      </PostTags>
    </PostMeta>
  </PostLinkContainer>
)

const PostGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em 0;
`

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.subtext};
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

const PostLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: inherit;
  font-size: 1.125em;
  text-decoration: none;
`

const PostTitle = styled(InternalLink)`
  display: block;
  margin: 0;
  color: inherit;
  font-size: 1em;
  text-decoration: none;
`

const SorterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  margin: 0.75rem 0 3rem;
  font-size: 1.125em;
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
        By category ↓
      </SorterButton>
    }
    <SorterButton
      active={group === "Category"}
      onClick={() => setGroup("Category")}
    >
      By year ↓
    </SorterButton>
  </SorterContainer>
)

const SorterButton = styled.button<{ active: boolean }>`
  display: ${({ active }) => (active ? "none" : "inline")};
  padding: 0;
  color: ${({ theme, active = false }) => theme.colors.subtext};
  font-size: 1em;
  line-height: inherit;
  letter-spacing: inherit;
  background: none;
  border: none;
  outline: none;
  appearance: none;

  &:hover {
    filter: brightness(60%);
  }
`

export default Blog
