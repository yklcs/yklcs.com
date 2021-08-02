import React, { Children, isValidElement, useState, ReactChildren } from "react"
import { graphql, useStaticQuery, Node, Link } from "gatsby"
import styled, { css, DefaultTheme } from "styled-components"

import SEO from "../components/seo"
import { getImage, IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"

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

type CardType = "Case Study" | "Research" | "Project"
type ShowType = CardType | "All"

const IndexPage = (): JSX.Element => {
  const [show, setShow] = useState<ShowType>("All")

  const data: IndexQueryData = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "portfolio" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  `)

  const images = Object.fromEntries(
    data.allFile.nodes.map(node => [node.name, getImage(node)])
  )

  return (
    <Container>
      <SEO />
      <Bio>
        <Name>Lucas Lee</Name>
        <div />
        <Col>
          <span>studying</span>
          <span>developing</span>
          <span>designing</span>
          <Links>
            <ExternalLink href="mailto:me@luc.li">mail↗</ExternalLink>
            <InternalLink to="/resume">resume↗</InternalLink>
          </Links>
        </Col>
        <Col>
          <span>CS at POSTECH, Korea</span>
          <span>cool software at PoApper</span>
          <span>to inspire</span>
          <Links>
            <ExternalLink href="https://github.com/rocketll">
              github↗
            </ExternalLink>
            <InternalLink to="/blog">blog↗</InternalLink>
          </Links>
        </Col>
      </Bio>
      <Sorter show={show} setShow={setShow} />
      <Cards>
        <Card
          title="KdV"
          type="Research"
          image={images["kdv"]}
          width={1}
          active={["Research", "All"].includes(show)}
        />
        <Card
          title="hashmm"
          link="https://hashmm.com"
          type="Project"
          image={images["hashmm"]}
          width={2}
          active={["Project", "All"].includes(show)}
        />
        <Card
          title="Navier-Stokes"
          type="Research"
          image={images["ns"]}
          width={1}
          active={["Research", "All"].includes(show)}
        />
        <Card
          title="SSP"
          link="https://poscossp.com"
          type="Case Study"
          image={images["ssp"]}
          width={2}
          active={["Case Study", "All"].includes(show)}
          background
        />
      </Cards>
    </Container>
  )
}

const Name = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 1em;
`

// const Cards = ({ children, show }: { children: JSX.Element[], show: ShowType }): JSX.Element => (
//   <CardsContainer>
//     {Children.toArray(children).filter(child => isValidElement<{
//       type: ShowType
//     }>(child) ? (show === child.props.type || show === "All") : null)}
//   </CardsContainer>
// )

const linkStyle = css`
  color: inherit;
  text-decoration: none;
`

const InternalLink = styled(Link)`
  ${linkStyle}
`

const ExternalLink = styled.a`
  ${linkStyle}
`

const Cards = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem 2rem;
  margin: 1rem 0 0 0;

  @media screen and (max-width: 40rem) {
    grid-template-columns: repeat(2, 1fr);
  }
`

interface CardProps {
  title: string
  link?: string
  type: CardType
  image?: IGatsbyImageData
  active?: boolean
  width: CardWidth
  background?: boolean
}

const Card = ({
  title,
  link,
  type,
  image,
  width,
  active = true,
  background = false,
}: CardProps) => {
  const content = (
    <>
      {image && (
        <CardImageWrapper background={background}>
          <CardImage background={background} alt={title} image={image} />
        </CardImageWrapper>
      )}
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{type}</CardSubtitle>
    </>
  )

  return (
    <CardContainer active={active} width={width}>
      {link ? <CardLink href={link}>{content}</CardLink> : content}
    </CardContainer>
  )
}

const CardImageWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 10rem;
  opacity: 0.7;
  transition: opacity 0.5s;

  &:hover {
    opacity: 1;
  }

  ${({ background }: { background: boolean }) =>
    background &&
    css`
      background: #eeeeee;
    `}
`

interface CardImageProps {
  background: boolean
}

const CardImage = styled(GatsbyImage)`
  ${({ background }: CardImageProps) =>
    background &&
    `
    width: 50%;
    margin: auto;
    box-shadow: 0 0 1rem 0.25rem #00000022;
  `}
`

const CardLink = styled.a`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  height: 100%;
  color: ${({ theme }) => theme.foreground.default};
  text-decoration: none;
`

type CardWidth = 1 | 2 | 3 | 4

interface CardContainerProps {
  width: CardWidth
  active: boolean
}

const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  grid-column: span ${({ width }) => width};
  line-height: 1.3;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  filter: ${({ active }) => (active ? "none" : "blur(4px)")};
  transition: opacity 0.5s, filter 0.5s;
  pointer-events: ${({ active }) => (active ? "default" : "none")};
`

const CardTitle = styled.span`
  margin: 0.5rem 0 0 0;
`

const CardSubtitle = styled.span`
  color: ${({ theme }) => theme.foreground.sub};
`

const Container = styled.div`
  margin: 10rem 0 0 0;
  line-height: 2;
  white-space: nowrap;

  @media screen and (max-width: 40rem) {
    margin: 5rem 0 0 0;
  }
`

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 3rem 0;
  opacity: 0.8;
`

const Bio = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  color: ${({ theme }) => theme.foreground.highlight};

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
  }
`

const Col = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
`

const Sorter = ({
  show,
  setShow,
}: {
  show: ShowType
  setShow: React.Dispatch<React.SetStateAction<ShowType>>
}) => {
  return (
    <SorterContainer>
      <SortButton active={show === "All"} onClick={() => setShow("All")}>
        All
      </SortButton>
      <SortButton
        active={show === "Case Study"}
        onClick={() => setShow("Case Study")}
      >
        Case Study
      </SortButton>
      <SortButton
        active={show === "Research"}
        onClick={() => setShow("Research")}
      >
        Research
      </SortButton>
      <SortButton
        active={show === "Project"}
        onClick={() => setShow("Project")}
      >
        Project
      </SortButton>
    </SorterContainer>
  )
}

const SorterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 4rem 0 0 0;
`

interface SortButtonProps {
  theme: DefaultTheme
  active?: boolean
}

const SortButton = styled.button`
  padding: 0;
  color: ${({ theme, active = false }: SortButtonProps) =>
    active ? "inherit" : theme.foreground.sub};
  font-size: 1em;
  background: none;
  border: none;
  outline: none;
  appearance: none;
`

export default IndexPage
