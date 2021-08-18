import React, { Dispatch, SetStateAction, useState } from "react"
import { graphql, useStaticQuery, Node } from "gatsby"
import styled, { css, DefaultTheme } from "styled-components"

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

const cardTypes = ["Design", "Research", "Development"] as const
type CardType = typeof cardTypes[number]
const showTypes = ["All", ...cardTypes] as const
type ShowType = typeof showTypes[number]

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
        <Name
          css={css`
            grid-column: span 2;
          `}
        >
          Lucas Yunkyu Lee
        </Name>
        <Wow>
          <WowTitle>student</WowTitle>
          <WowDesc>
            at POSTECH, Korea, with a focus on scientific machine learning
            research
          </WowDesc>
        </Wow>
        <Wow>
          <WowTitle>developer</WowTitle>
          <WowDesc>
            at PoApper performing fullstack webdev and cloud-native devops
          </WowDesc>
        </Wow>
        <Wow>
          <WowTitle>designer</WowTitle>
          <WowDesc>creating ux, ui, and visuals to inspire</WowDesc>
        </Wow>
        <Wow
          css={css`
            margin: 2rem 0 0 0;
          `}
        >
          <WowTitle>links</WowTitle>
          <Links>
            <ExternalLink underline={false} href="mailto:me@luc.li">
              Mail↗
            </ExternalLink>
            <ExternalLink underline={false} href="https://github.com/rocketll">
              Github↗
            </ExternalLink>
            <InternalLink underline={false} to="/resume">
              Resume↗
            </InternalLink>
            <InternalLink underline={false} to="/blog">
              Blog↗
            </InternalLink>
          </Links>
        </Wow>
        {/* <Description>
          Studying at POSTECH with the Presidential Science Scholarship.
          Currently working at PoApper performing fullstack web development,
          DevOps, and UI/UX design.
        </Description> */}
      </Bio>
      <Sorter show={show} setShow={setShow} />
      <Cards>
        <Card
          title="KdV PINN"
          link="/kdv-pinn"
          type="Research"
          image={images["kdv"]}
          width={1}
          active={["Research", "All"].includes(show)}
        />
        <Card
          title="luc.li"
          type="Design"
          image={images["luc.li"]}
          width={2}
          active={["Design", "All"].includes(show)}
        />
        <Card
          title="Navier-Stokes"
          type="Research"
          image={images["ns"]}
          width={1}
          active={["Research", "All"].includes(show)}
        />
        <Card
          title="hashmm"
          link="https://hashmm.com"
          type="Development"
          image={images["hashmm"]}
          width={2}
          active={["Development", "All"].includes(show)}
          background
        />
      </Cards>
    </Container>
  )
}

const Wow = styled.div`
  display: grid;
  grid-column: span 4;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem 1.5rem;
  color: ${({ theme }) => theme.neutral.l15};

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
  }
`

const WowTitle = styled.span`
  grid-column: span 2;

  @media screen and (max-width: 50rem) {
    grid-column: span 1;
  }
`

const WowDesc = styled.span`
  grid-column: span 2;

  @media screen and (max-width: 50rem) {
    grid-column: span 1;
  }
`

const Name = styled.h1`
  grid-column: span 1;
  margin: 0 0 3rem 0;
  font-weight: 700;
  font-size: 1em;

  @media screen and (max-width: 50rem) {
    margin: 0 0 2rem 0;
  }
`

const Hello = styled.p`
  grid-column: span 3;
  margin: 0;
  color: ${({ theme }) => theme.neutral.l15};
  font-weight: 500;
  font-size: 1.3em;
  letter-spacing: -0.03em;

  @media screen and (max-width: 50rem) {
    grid-column: span 2;
  }
`

const Description = styled.p`
  grid-column: span 2;
  margin: 0;

  @media screen and (max-width: 40rem) {
    grid-column: span 2;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.5;
`

const Bio = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.75rem 1.5rem;
  width: 100%;
  margin: 3rem 0 6rem 0;
  color: ${({ theme }) => theme.brand.l50};
  font-size: 1.1em;

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

  @media screen and (max-width: 50rem) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  grid-column: span 2;
  gap: 0 1.5rem;
  align-items: flex-start;
  color: ${({ theme }) => theme.brand.l50};

  @media screen and (max-width: 50rem) {
    flex-direction: column;
    grid-column: span 1;
  }
`

const SorterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
  line-height: 2rem;
`

interface SortButtonProps {
  theme: DefaultTheme
  active?: boolean
}

const SortButton = styled.button`
  padding: 0;
  color: ${({ theme, active = false }: SortButtonProps) =>
    active ? "inherit" : theme.neutral.l65};
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

const Sorter = ({
  show,
  setShow,
}: {
  show: ShowType
  setShow: Dispatch<SetStateAction<ShowType>>
}) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(open ? false : true)

  return (
    <SorterContainer
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
    >
      <span
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyPress={toggleOpen}
        css={css`
          flex-shrink: 0;
          &:focus {
            outline: 0;
          }
        `}
      >
        Show {show}
      </span>
      {
        <div
          css={css`
            display: flex;
            margin: 0 0 0 0.75rem;
            overflow: hidden;
            transition: width 0.5s;
          `}
          style={{ width: open ? "100%" : 0 }}
        >
          {showTypes
            .filter(type => type !== show)
            .map(type => (
              <SortButton
                css={css`
                  margin-right: 0.7rem;
                `}
                active={false}
                onClick={() => {
                  setShow(type)
                  setOpen(false)
                }}
              >
                {type}
              </SortButton>
            ))}
        </div>
      }
      <span
        css={css`
          margin: 0 0 0 -0.25rem;
          transition: tranform 0.3s;
        `}
        style={{
          transform: open ? "rotate(-90deg)" : "none",
        }}
      >
        ↓
      </span>
    </SorterContainer>
  )
}

export { CardType, ShowType }
export default IndexPage
