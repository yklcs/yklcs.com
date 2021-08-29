import React, { Dispatch, SetStateAction, useState } from "react"
import { graphql, useStaticQuery, Node } from "gatsby"
import styled, { css } from "styled-components"

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
        <span
          css={css`
            grid-column: 1 / span 3;
            /* margin: 0 0 3rem 0; */
            color: ${({ theme }) => theme.neutral.l15};
            /* font-weight: 500; */
            font-size: 1.25em;
            line-height: 1.5;

            @media screen and (max-width: 50rem) {
              grid-column: span 2;
              font-size: 1.15em;
            }
          `}
        >
          Lucas Yunkyu Lee
          <br />
          <span
            css={css`
              color: ${({ theme }) => theme.neutral.l50};
            `}
          >
            research <br /> development <br /> design
          </span>
        </span>
        <span
          css={css`
            grid-column: 3 / span 2;
            margin: 3rem 0 3rem 0;
            color: ${({ theme }) => theme.neutral.l50};
            font-weight: 400;
            font-size: 1em;
            line-height: 1.9rem;

            @media screen and (max-width: 50rem) {
              grid-column: 1 / span 2;
            }
          `}
        >
          Studying at{" "}
          <span
            css={css`
              color: ${({ theme }) => theme.neutral.l15};
            `}
          >
            POSTECH
          </span>{" "}
          on a Presidential Science Scholarship focusing on SciML research.
          Performing fullstack webdev and cloud-native devops for{" "}
          <span
            css={css`
              color: ${({ theme }) => theme.neutral.l15};
            `}
          >
            PoApper
          </span>
          . Designing on-and-off for various projects.
        </span>
        <Links
          css={css`
            display: grid;
            grid-auto-flow: column;
            grid-column: 3 / span 2;
            grid-template-rows: 1fr 1fr;
            grid-template-columns: 1fr 1fr;
            gap: 0 1.5rem;
            justify-items: start;
            color: ${({ theme }) => theme.neutral.l50};
            font-size: 1em;
            line-height: 1.9rem;

            @media screen and (max-width: 50rem) {
              /* display: flex; */
              flex-direction: column;
              grid-column: 1 / span 2;
              align-items: flex-start;
            }

            *:hover {
              color: ${({ theme }) => theme.neutral.l15};
            }
          `}
        >
          <ExternalLink $underline={false} href="mailto:me@luc.li">
            me@luc.li
          </ExternalLink>
          <ExternalLink $underline={false} href="https://github.com/rocketll">
            github.com/rocketll
          </ExternalLink>
          <InternalLink $underline={false} to="/resume">
            Resume↗
          </InternalLink>
          <InternalLink $underline={false} to="/blog">
            Blog↗
          </InternalLink>
        </Links>
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

const BioItem = styled.div`
  display: grid;
  grid-column: span 4;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem 1.5rem;
  color: ${({ theme }) => theme.neutral.l15};

  @media screen and (max-width: 50rem) {
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr 1fr;
  }
`

const BioItemTitle = styled.span`
  grid-column: span 2;

  @media screen and (max-width: 50rem) {
    grid-column: span 1;
  }
`

const BioItemDesc = styled.span`
  grid-column: span 2;
  color: ${({ theme }) => theme.neutral.l65};

  @media screen and (max-width: 50rem) {
    grid-column: span 1;
  }
`

const Name = styled.h1`
  grid-column: span 4;
  margin: 0 0 3rem 0;
  font-weight: 700;
  font-size: 1em;

  @media screen and (max-width: 50rem) {
    margin: 0 0 2rem 0;
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
  grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0rem 1.5rem;
  width: 100%;
  margin: 4.5rem 0 6rem 0;
  color: ${({ theme }) => theme.brand.l50};
  font-size: 1em;
  letter-spacing: -0.01em;

  @media screen and (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1rem;
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
  align-items: flex-start;
  color: ${({ theme }) => theme.brand.l50};

  @media screen and (max-width: 50rem) {
    grid-column: span 1;
  }

  * {
    margin: 0 1rem 0 0;
  }
`

const SorterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.neutral.l65};
  line-height: 2rem;
`

const SortButton = styled.button`
  padding: 0;
  color: inherit;
  font-size: 1em;
  line-height: inherit;
  letter-spacing: inherit;
  background: none;
  border: none;
  outline: none;
  appearance: none;

  &:hover {
    color: ${({ theme }) => theme.neutral.l15};
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
          <span
            css={css`
              margin: 0 0.75rem 0 0;
            `}
          >
            /
          </span>
          {showTypes
            .filter(type => type !== show)
            .map(type => (
              <SortButton
                key={type}
                css={css`
                  margin-right: 0.7rem;
                `}
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
