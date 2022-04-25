import { graphql, useStaticQuery } from "gatsby"
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  StaticImage,
} from "gatsby-plugin-image"
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"
import React, { ReactNode } from "react"
import styled, { css } from "styled-components"
import Link from "../components/links"
import respond from "../utils/responsive"

interface IndexQueryData {
  allFile: {
    nodes: (FileNode & {
      name: string
    })[]
  }
}

const IndexPage = (): JSX.Element => {
  const data: IndexQueryData = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "index" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.618)
          }
        }
      }
    }
  `)

  const images = Object.fromEntries(
    data.allFile.nodes.map(node => [node.name, getImage(node)])
  )

  return (
    <>
      <HeroWrapper>
        <StaticImage
          src="../images/index/bg.jpg"
          alt=""
          layout="fullWidth"
          style={{
            position: "absolute",
            zIndex: -1,
            filter: "brightness(100%)",
            width: "100%",
            height: "100%",
          }}
          imgStyle={{ objectFit: "cover", objectPosition: "70% 50%" }}
        />
        <div
          style={{
            zIndex: -2,
            background: "#f6f6f6",
            color: "#000000",
          }}
        />
        <Hero>
          <Description>
            Striving for innovation through research, development, and design.
            {/* Hello, I'm Lucas. I strive for innovation through research,
            development, and design. Based in Korea, currently at POSTECH and
            PoApper. */}
          </Description>
          <Links>
            <LinkSet>
              <span style={{ margin: "0 0 0.5rem 0" }}>Contact</span>
              <Link to="mailto:me@luc.li">me@luc.li</Link>
              <Link to="mailto:lucaslee@postech.edu">lucaslee@postech.edu</Link>
            </LinkSet>
            <LinkSet>
              <span style={{ margin: "0 0 0.5rem 0" }}>Social</span>
              <Link to="https://github.com/rocketll">github.com/rocketll</Link>
              <Link to="https://instagram.com/yklcs">instagram.com/yklcs</Link>
            </LinkSet>
          </Links>
        </Hero>
      </HeroWrapper>

      <Section>
        <SectionHeader>What I do</SectionHeader>
        <ColorCard>
          <h3 style={{ margin: 0, fontWeight: 500, fontSize: "1em" }}>
            Research
          </h3>
          <p style={{ margin: "0.75rem 0 0 0" }}>
            Data-driven research projects. Interests are computational sciences,
            physics informed NNs, and more.
          </p>
        </ColorCard>
        <ColorCard>
          <h3 style={{ margin: 0, fontWeight: 500, fontSize: "1em" }}>
            Development
          </h3>
          <p style={{ margin: "0.75rem 0 0 0" }}>
            Web development, systems programming, open source contributions and
            more. Also cloudnative DevOps.
          </p>
        </ColorCard>
        <ColorCard>
          <h3 style={{ margin: 0, fontWeight: 500, fontSize: "1em" }}>
            Design
          </h3>
          <p style={{ margin: "0.75rem 0 0 0" }}>
            Thoughtful UI/UX design in conjunction with expression through code.
          </p>
        </ColorCard>
      </Section>

      <Section>
        <SectionHeader>Selected projects</SectionHeader>
        <ProjectCard
          background={images["DSCF1514"]!}
          title="Photography 2021"
          category="Photography"
          description=""
        />
        <ProjectCard
          background="#35b26f"
          title="luc.li"
          category="Development"
          description="Personal website development. Modern best practices."
        />
        <ProjectCard
          background="#4824ca"
          title="Image inpainting with implicit NNs"
          category="Research"
          description="Personal website development. Modern best practices."
        />
        <ProjectCard
          background="#4824ca"
          title="Image inpainting with implicit NNs"
          category="Research"
          description="Personal website development. Modern best practices."
        />
      </Section>

      <Section>
        <SectionHeader>See more projects:</SectionHeader>
        <Projects>
          <Project year="2022">Implicit image inpainting</Project>
          <Project year="2021">SoarJS</Project>
          <Project year="2022">fights.ai</Project>
          <Project year="2021">Sane color theme</Project>
          <Project year="2022">AI HW accelerator FPGA</Project>
          <Project year="2019">Physics informed NNs</Project>
          <Project year="2019">hashmm.com</Project>
        </Projects>
      </Section>
    </>
  )
}

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: min-content;
  gap: 1.25rem;
`

const HeroWrapper = styled.div`
  display: flex;
  position: relative;
  left: 0;
  overflow: hidden;

  ${respond(
    "sm",
    css`
      margin: 0;
    `
  )}

  @media screen and (max-width: 50rem) {
    margin: 0 -1.5rem;
    border-radius: 0;
  }
`

const Hero = styled.div`
  margin: 0 auto;
  max-width: 100rem;
  grid-area: 1 / 1;
  position: relative;
  color: #ffffff;
  ${gridStyle}
`

const Description = styled.p`
  font-size: 3.5em;
  font-weight: 400;
  line-height: 1.2;
  grid-column: 1 / span 4;
  letter-spacing: -0.03em;
  padding: 4rem 2rem;

  margin: 0 0 3rem -0.03em;

  ${respond(
    "sm",
    css`
      grid-column: 1 / -1;
      font-size: 2.5rem;
    `
  )}
`

const SectionHeader = styled.h2`
  margin: 1rem 0;
  margin: 1rem -0.075em;
  font-weight: 400;
  letter-spacing: -0.03em;
  font-size: 2.5em;
  line-height: 1;
  grid-column: 1 / -1;

  ${respond(
    "md",
    css`
      font-size: 2rem;
      margin: 1rem -0.075em;
    `
  )}
`

const SubDescription = styled.p`
  font-size: 1.25em;
  line-height: 1.5;
  grid-column: 1 / span 3;
  opacity: 0.7;
  letter-spacing: -0.015em;
  max-width: 40ch;
  margin: 6rem 0 2rem 0;

  @media screen and (max-width: 70rem) {
    grid-column: 1 / span 4;
  }

  @media screen and (max-width: 50rem) {
    grid-column: 1 / -1;
  }
`

const Links = styled.div`
  font-size: 1.125em;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding: 2rem 2rem 4rem 2rem;
  grid-column: 1 / span 2;

  ${respond(
    "sm",
    css`
      flex-direction: column;
    `
  )}
`

const LinkSet = styled.div`
  display: flex;
  flex-direction: column;
`

const Projects = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max(300px, 30%), 1fr));
  grid-auto-rows: 1.25em;
  gap: 0.75rem 1.5rem;
  margin: 0;

  ${respond(
    "md",
    css`
      margin: 0;
    `
  )}
`

const Section = styled.div`
  grid-column: main;
  margin: 9rem 0 0 0;
  ${gridStyle}
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ColorCard = styled.div`
  border-radius: 0.5rem;
  background: #e9e9e9;
  /* color: #ffffff; */
  padding: 2rem;
  grid-column: span 2;
  font-size: 1.125em;

  ${respond(
    "sm",
    css`
      grid-column: span 6;
    `
  )}
`

const ProjectCardContainer = styled.div`
  grid-column: span 2;
  height: auto;
  position: relative;
  display: flex;
  grid-auto-rows: min-content;
  gap: 0.75rem 2.5vw;
  aspect-ratio: 1;

  ${respond(
    "md",
    css`
      grid-column: span 3;
    `
  )}

  ${respond(
    "sm",
    css`
      aspect-ratio: 1.618;
      grid-column: span 6;
    `
  )}
`

const ProjectCardTextWrapper = styled.div`
  padding: 2rem;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-radius: 0.5rem;
  color: #ffffff;

  ${respond(
    "sm",
    css`
      grid-column: 1 / -1;
    `
  )}
`

const ProjectCard = ({
  background,
  title,
  category,
  description,
}: {
  background: IGatsbyImageData | string
  title: string
  category?: string
  description?: string
}) => (
  <ProjectCardContainer>
    {typeof background === "string" ? (
      <div
        style={{
          gridColumn: "1 / span 3",
          borderRadius: "0.5rem",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: background,
        }}
      />
    ) : (
      <GatsbyImage
        image={background}
        style={{
          gridColumn: "1 / span 3",
          borderRadius: "0.5rem",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        alt="wow"
      />
    )}
    <ProjectCardTextWrapper>
      <span style={{ fontSize: "1em" }}>{category}</span>
      <span
        style={{
          fontSize: "2.5em",
          margin: "auto 0 0 0",
          fontWeight: 500,
          lineHeight: 1.15,
        }}
      >
        {title}
      </span>
      <p
        style={{
          fontSize: "0.875em",
          margin: "1rem 0 0 0",
        }}
      >
        {description}
      </p>
    </ProjectCardTextWrapper>
  </ProjectCardContainer>
)

const Project = ({
  year,
  children,
}: {
  year: string | number
  children: ReactNode
}): JSX.Element => (
  <ProjectContainer>
    <span>{children}</span>
    <span style={{ opacity: 0.5, fontVariant: "tabular-nums" }}>{year}</span>
  </ProjectContainer>
)

export default IndexPage
