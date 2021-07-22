import React, { FunctionComponent } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled, {
  css,
  DefaultTheme,
  FlattenSimpleInterpolation,
  keyframes,
  ThemedCssFunction,
} from "styled-components"

import SEO from "../components/seo"
import {
  getImage,
  ImageDataLike,
  StaticImage,
  GatsbyImage,
  IGatsbyImageData,
} from "gatsby-plugin-image"
import { Node } from "gatsby"

interface IndexQueryData {
  allFile: {
    nodes: (Node & {
      name: string
      childImageSharp: Node & {
        gatsbyImageData: IGatsbyImageData
      }
    })[]
  }
}

const media = (size: string, style: FlattenSimpleInterpolation) => css`
  @media screen and (max-width: ${size}) {
    ${style}
  }
`

enum CardType {
  Research = "research",
}

const IndexPage: FunctionComponent = () => {
  const data: IndexQueryData = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "portfolio" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  `)

  const images = data.allFile.nodes.map(node => getImage(node))

  return (
    <Container>
      <SEO />
      <Bio>
        <span>Lucas Lee</span>
        <div />
        <Col>
          <span>studying</span>
          <span>developing</span>
          <span>designing</span>
          <Links>
            <span>mail</span>
            <span>resume</span>
          </Links>
        </Col>
        <Col>
          <span>CS at POSTECH, Korea</span>
          <span>cool software at PoApper</span>
          <span>to inspire</span>
          <Links>
            <span>github</span>
            <span>blog</span>
          </Links>
        </Col>
      </Bio>
      <Cards>
        <Card
          title="KdV"
          link="/"
          type={CardType.Research}
          image={images[0]}
          width={1}
        />
        <Card
          title="KdV 2"
          link="/"
          type={CardType.Research}
          image={images[2]}
          width={2}
        />
        <Card
          title="KdV 2"
          link="/"
          type={CardType.Research}
          image={images[1]}
          width={1}
        />
      </Cards>
    </Container>
  )
}

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  margin: 4rem 0 0 0;

  ${media(
    "35rem",
    css`
      grid-template-columns: 1fr 1fr;
    `
  )}
`

const Card = ({
  title,
  link,
  type,
  image,
  width,
}: {
  title: string
  link: string
  type: CardType
  image?: IGatsbyImageData
  width: number
}) => (
  <CardContainer width={width}>
    {image && <GatsbyImage alt={title} image={image} />}
    <CardTitle>{title}</CardTitle>
    <CardLink href={link}>View {type}</CardLink>
  </CardContainer>
)

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span ${({ width }: { width: number }) => width};
  line-height: 1.5;
`

const CardTitle = styled.span``

const CardLink = styled.a``

const Container = styled.div`
  margin: 10rem 0 0 0;
  line-height: 2;
  white-space: nowrap;
`

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 3rem 0;
`

const Bio = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  ${media(
    "50rem",
    css`
      grid-template-columns: 1fr 1fr;
    `
  )}
`

const Col = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
`

export default IndexPage
