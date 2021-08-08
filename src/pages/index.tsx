import React, { useState } from "react"
import { graphql, useStaticQuery, Node } from "gatsby"
import styled, { DefaultTheme } from "styled-components"

import SEO from "../components/seo"
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { ExternalLink, InternalLink } from "../components/links"
import Card from "../components/portfolio-card"

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

export type CardType = "Case Study" | "Research" | "Project"
export type ShowType = CardType | "All"

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
        <div>
          <Name>Lucas Lee</Name>
          <Name>이윤규</Name>
        </div>
        <Description>
          Korean student, developer, designer studying CS at POSTECH.
          <br />
          <br />
          Recieved the Presidential Science Scholarship with a focus on SciML
          research. Currently working at PoApper performing fullstack web
          development, DevOps, and UI/UX design.
        </Description>
        <Col style={{ marginBottom: "-1.5em" }}>
          <Sorter show={show} setShow={setShow} />
        </Col>
        <Col style={{ alignItems: "start" }}>
          <ExternalLink href="mailto:me@luc.li">me@luc.li</ExternalLink>
          <ExternalLink href="https://github.com/rocketll">
            github.com/rocketll
          </ExternalLink>
          <br style={{ margin: "1.5em 0 0 0" }} />
          <InternalLink to="/resume">Resume</InternalLink>
          <InternalLink to="/blog">Blog</InternalLink>
        </Col>
      </Bio>
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

const Description = styled.div`
  @media screen and (max-width: 40rem) {
    grid-column: span 2;
  }
`

const Container = styled.div`
  margin: 6rem 0 0 0;
  line-height: 1.5;

  @media screen and (max-width: 40rem) {
    margin: 4.5rem 0 0 0;
  }
`

const Bio = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  color: ${({ theme }) => theme.brand.l50};

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem 1rem;
  }
`

const Cards = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 1.5rem;
  margin: 4.5rem 0 0 0;

  @media screen and (max-width: 50rem) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
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
        active={show === "Research"}
        onClick={() => setShow("Research")}
      >
        Research
      </SortButton>
      <SortButton
        active={show === "Case Study"}
        onClick={() => setShow("Case Study")}
      >
        Case Study
      </SortButton>
      <SortButton
        active={show === "Project"}
        onClick={() => setShow("Project")}
      >
        Project
      </SortButton>
      <span>↓</span>
    </SorterContainer>
  )
}

const SorterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
`

interface SortButtonProps {
  theme: DefaultTheme
  active?: boolean
}

const SortButton = styled.button`
  padding: 0;
  color: ${({ theme, active = false }: SortButtonProps) =>
    active ? "inherit" : theme.brand.l80};
  font-size: 1em;
  line-height: inherit;
  background: none;
  border: none;
  outline: none;
  appearance: none;

  &:hover {
    color: inherit;
  }
`

export default IndexPage
