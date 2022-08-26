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
            margin: 3rem 0 6rem;

            ${respond(
              "sm",
              css`
                margin: 1.5rem 0 3rem;
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
              display: grid;
              grid-column: 1 / span 3;
              grid-template-columns: 1fr 1fr;
              gap: 2rem 0;
              margin: 4rem 0 0;
              font-size: 1.125em;

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
          color: #ffffff;
          background-color: #040404;
        `}
      >
        <Section>
          <SectionHeader>Interests</SectionHeader>
          {[
            {
              title: "Research",
              entries: [
                "Neural networks",
                "Generative models",
                "Scientific ML",
              ],
            },
            {
              title: "Development",
              entries: [
                "Web development",
                "Systems development",
                "Scientific computing",
                "DevOps",
                "MLOps",
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
                grid-column: span 6;
                grid-template-columns: 1fr 1fr;
                gap: 1.25rem 1.25rem;
                margin: 0 0 1rem;

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
                  font-weight: 400;
                  font-size: 1.75em;
                  line-height: 1;
                  letter-spacing: -0.025em;

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
                  display: flex;
                  flex-direction: column;
                  font-size: 1.25em;

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
            description="Environments for competitive multi-agent reinforcement learning research and development"
          />
          <Project
            title="Multi-object tracking"
            year="2022"
            description="Evaluating state-of-the-art multi-object tracking models with real-world data"
          />
          <Project
            title="Deep learning hardware design"
            year="2022"
            description="Accelerating object detection networks with FPGAs"
          />
          <Project
            title="hashmm.com"
            year="2020"
            description="Online student magazine for Hana Academy Seoul"
          />
        </Section>
      </Wrapper>
    </>
  )
}

const gridStyle = css`
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(6, 1fr);
  gap: 2.5rem;
`

const Description = styled.p`
  grid-column: span 4;
  margin: 0;
  font-weight: 450;
  font-size: 2.75em;
  line-height: 1.3;
  letter-spacing: -0.025em;

  ${respond(
    "md",
    css`
      grid-column: span 5;
    `
  )}

  ${respond(
    "sm",
    css`
      grid-column: 1 / -1;
      font-size: 2em;
    `
  )}
`

const SectionHeader = styled.h2`
  grid-column: 1 / -1;
  margin: 0 -0.025em 4rem 0;
  font-weight: 600;
  font-size: 2.75em;
  line-height: 1;
  letter-spacing: -0.03em;

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
  display: flex;
  flex-direction: column;
  grid-column: span 2;
  justify-content: start;
  font-size: 1.125em;

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
        margin: 0;
        font-weight: 500;
        font-size: 1em;
      `}
    >
      {title}
    </h3>
    <time dateTime={`${year}`}>{year}</time>
    <p
      css={css`
        max-width: 80%;
        margin: 0;

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
