import React from "react"
import styled, { css } from "styled-components"
import { Wrapper } from "../components/layout"
import Link from "../components/links"
import respond from "../utils/responsive"

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Section
          css={css`
            margin: 3rem 0 6rem 0;

            ${respond(
              "sm",
              css`
                margin: 1.5rem 0 3rem 0;
              `
            )}
          `}
        >
          <Description>
            Student at POSTECH with interests in research, development, and
            design. Currently on an internship at KIST.
          </Description>
          <Description>I build my ideas.</Description>
          <div
            css={css`
              grid-column: 1 / span 3;
              display: grid;
              font-size: 1.125em;
              grid-template-columns: 1fr 1fr;
              margin: 4rem 0 0 0;
              gap: 2rem 0;

              ${respond(
                50,
                css`
                  grid-template-columns: 1fr;
                  gap: 1rem 0;
                `
              )}
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <span>Send spam</span>
              <Link to="mailto:me@luc.li">me@luc.li</Link>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <span>Read ramblings</span>
              <Link to="/blog">luc.li/blog</Link>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <span>Criticize code</span>
              <Link to="https://github.com/yklcs">github.com/yklcs</Link>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <span>Question qualifications</span>
              <Link to="/resume">luc.li/resume</Link>
            </div>
          </div>
        </Section>
      </Wrapper>
      <Wrapper
        css={css`
          background-color: #040404;
          color: #ffffff;
        `}
      >
        <Section>
          <SectionHeader>Interests</SectionHeader>
          {[
            {
              title: "Research",
              entries: ["Generative models", "Neural networks", "SciML"],
            },
            {
              title: "Development",
              entries: [
                "Systems development",
                "MLOps",
                "Web frontend",
                "DevOps",
                "Scientific computing",
              ],
            },
            {
              title: "Design",
              entries: [
                "UI/UX",
                "Visual identity",
                "Photography",
                "Typography",
              ],
            },
          ].map(({ title, entries }) => (
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.25rem 1.25rem;
                grid-column: span 6;
                margin: 0 0 1rem 0;

                ${respond(
                  "sm",
                  css`
                    grid-template-columns: 1fr;
                  `
                )}
              `}
            >
              <div
                css={css`
                  font-size: 1.75em;
                  font-weight: 400;
                  letter-spacing: -0.025em;
                  line-height: 1;

                  ${respond(
                    "md",
                    css`
                      font-size: 1.5em;
                    `
                  )}
                `}
              >
                {title}
              </div>
              <div
                css={css`
                  font-size: 1.25em;
                  display: flex;
                  flex-direction: column;

                  ${respond(
                    "md",
                    css`
                      font-size: 1.125em;
                    `
                  )}
                `}
              >
                {entries.map(entry => (
                  <span>{entry}</span>
                ))}
              </div>
            </div>
          ))}
        </Section>
      </Wrapper>
      <Wrapper>
        <Section>
          <SectionHeader>Projects</SectionHeader>
          <Project
            title="Implicit image inpainting"
            year="2022"
            description="Facial image inpainting through implicit neural representations"
          />
          <Project
            title="fights.ai"
            year="2022"
            description="Environments for competitive multi-agent artificial intelligence development"
          />
          <Project
            title="Sane color theme"
            year="2022"
            description="A saner color theme"
          />
          <Project
            title="Deep learning hardware design"
            year="2022"
            description="Hardware acceleration of object detection"
          />
          <Project
            title="hashmm.com"
            year="2022"
            description="School newspaper"
          />
        </Section>
      </Wrapper>
    </>
  )
}

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: min-content;
  gap: 2rem;
`

const Description = styled.p`
  font-size: 2.75em;
  font-weight: 450;
  line-height: 1.3;
  grid-column: span 4;

  letter-spacing: -0.025em;

  margin: 0;

  ${respond(
    "md",
    css`
      grid-column: span 5;
    `
  )}

  ${respond(
    "sm",
    css`
      font-size: 2em;
      grid-column: 1 / -1;
    `
  )}
`

const SectionHeader = styled.h2`
  margin: 0 -0.025em 4rem 0;
  font-weight: 600;
  letter-spacing: -0.03em;
  font-size: 2.75em;
  line-height: 1;
  grid-column: 1 / -1;

  ${respond(
    "md",
    css`
      font-size: 2rem;
    `
  )}
`

const Section = styled.div`
  grid-column: main;
  margin: 4.5rem 0;
  ${gridStyle}
`

const ProjectContainer = styled.div`
  grid-column: span 2;
  display: flex;
  font-size: 1.125em;
  flex-direction: column;
  justify-content: start;

  ${respond(
    "lg",
    css`
      grid-column: span 3;
    `
  )}

  ${respond(
    "sm",
    css`
      grid-column: span 6;
    `
  )}
`

const Project = ({
  year,
  title,
  description,
}: {
  year: string | number
  title: string
  description: string
}): JSX.Element => (
  <ProjectContainer>
    <h3
      css={css`
        font-size: 1em;
        margin: 0;
        font-weight: 500;
      `}
    >
      {title}
    </h3>
    <time dateTime={`${year}`}>{year}</time>
    <p
      css={css`
        margin: 0;
        max-width: 80%;

        ${respond(
          "sm",
          css`
            max-width: 100%;
          `
        )}
      `}
    >
      {description}
    </p>
  </ProjectContainer>
)

export default IndexPage
