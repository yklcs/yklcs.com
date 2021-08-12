import React from "react"
import { format } from "date-fns"
import { graphql, Node, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import styled from "styled-components"
import { BlogFrontmatter } from "../templates/blog"
import { PageFrontmatter } from "../templates/page"

const lineHeight = 1.8
const typeScale = 1.2

const Title = styled.h1`
  margin: ${lineHeight}rem 0 ${lineHeight / 2}rem 0;
  font-weight: 700;
  font-size: 2.5em;
  font-family: XCharter, serif;
  line-height: ${lineHeight * 1.5}rem;
  letter-spacing: -0.022em;
`

const Description = styled.p`
  margin: 0;
  font-size: ${typeScale}em;
  line-height: ${lineHeight}rem;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;

  @media screen and (max-width: 45rem) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;
  }
`

const Wrapper = styled.div`
  grid-column: 2/4;
  font-family: XCharter, serif;
  letter-spacing: -0.015rem;

  @media screen and (max-width: 65rem) {
    grid-column: 1/4;
  }
`

const Content = styled.div`
  position: relative;
  font-size: 1.2em;
  line-height: ${lineHeight}rem;
`

const HeaderImage = styled(GatsbyImage)`
  justify-self: end;
  margin: ${lineHeight}rem 0;
  box-shadow: 0 0 16px 7px #00000011;

  @media screen and (max-width: 50rem) {
    justify-self: start;
    max-width: 66%;
    object-position: left;
  }
`

const HeaderData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 50rem) {
    order: 100;
  }
`

const HeaderContainer = styled.div<{ large: boolean }>`
  display: grid;
  grid-column: ${({ large }) => (large ? "1/5" : "2/4")};
  grid-template-rows: 1fr;
  grid-template-columns: ${({ large }) => (large ? "1fr 1fr" : "1fr")};
  gap: 1.5rem;
  margin: ${lineHeight * 3}rem 0 ${lineHeight * 2}rem;

  @media screen and (max-width: 65rem) {
    grid-column: ${({ large }) => (large ? "1/5" : "1/4")};
  }

  @media screen and (max-width: 50rem) {
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
  }
`

interface ImageQueryData {
  allFile: {
    nodes: (Node & {
      name: string
      childImageSharp: Node & {
        gatsbyImageData: IGatsbyImageData
      }
    })[]
  }
}

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

type BlogHeaderProps = BlogFrontmatter & { type: "Blog" }
type PageHeaderProps = PageFrontmatter & { type: "Page" }

const Header = (props: BlogHeaderProps | PageHeaderProps): JSX.Element => {
  const data: ImageQueryData = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "mdx" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, height: 400)
          }
        }
      }
    }
  `)

  const images = Object.fromEntries(
    data.allFile.nodes.map(node => [node.name, getImage(node)])
  )

  let image: IGatsbyImageData | null

  if (!props.image) {
    image = null
  } else {
    image = images[props.image] ?? null
  }

  return (
    <HeaderContainer large={props.large ?? false}>
      <HeaderData>
        <div>
          {props.type === "Blog" && <Category>{props.tags[0]}</Category>}
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>
        </div>
        {props.type === "Blog" ? (
          <MetaData>
            <div>
              <span>By {props.author} on </span>
              <DateTime dateTime={props.date}>
                {format(new Date(props.date), "PP")}
              </DateTime>
            </div>
            <Tags>
              {props.tags.map((tag, i) => [i ? "·" : "", <span>{tag}</span>])}
            </Tags>
          </MetaData>
        ) : (
          props.large && (
            <MetaData>
              <span>By {props.author}</span>
            </MetaData>
          )
        )}
      </HeaderData>
      {image && (
        <HeaderImage
          imgStyle={{ objectFit: "cover" }}
          alt={props.image ?? "Post"}
          image={image}
        />
      )}
    </HeaderContainer>
  )
}

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${lineHeight}rem 0;
  color: ${({ theme }) => theme.neutral.l65};
  line-height: ${lineHeight};
`

export {
  Layout,
  Wrapper,
  Title,
  Description,
  Content,
  Header,
  lineHeight,
  ImageQueryData,
}
