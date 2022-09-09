import React from "react"
import { differenceInDays } from "date-fns"
import styled, { css } from "styled-components"
import { Wrapper } from "../components/layout"
import Link from "../components/links"
import respond from "../utils/responsive"

const elapsedDateRatio = (begin: Date, now: Date, end: Date) =>
  Math.min(
    Math.max(
      (now.valueOf() - begin.valueOf()) / (end.valueOf() - begin.valueOf()),
      0
    ),
    1
  )

const IndexPage = (): JSX.Element => {
  const serviceBeginDate = new Date("2022-09-19T14:00:00+0900")
  const serviceEndDate = new Date("2024-03-17T14:00:00+0900")

  return (
    <>
      <Wrapper
        css={css`
          height: calc(100vh - 5.5rem);
        `}
      >
        <Section
          css={css`
            gap: 1rem 0;
            margin: 0 0 6rem;
            font-size: 1.5em;
            line-height: 1.35;

            ${respond(
              "md",
              css`
                margin: 0 0 3rem;
              `
            )}
          `}
        >
          <Description>
            Student at POSTECH with interests in research, development, and
            design. Currently on leave awaiting military service.{" "}
            <span
              css={css`
                /* stylelint-disable */
                color: hsl(
                  ${elapsedDateRatio(
                      serviceBeginDate,
                      new Date(),
                      serviceEndDate
                    ) * 0.3}turn
                    70% 40%
                );
                /* stylelint-enable */
              `}
            >
              Served for {differenceInDays(new Date(), serviceBeginDate)} days,{" "}
              {differenceInDays(serviceEndDate, new Date())} days until
              discharge.
            </span>
          </Description>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              grid-column: span 6;
              justify-content: start;
              margin: 1rem 0 0;
            `}
          >
            {[
              {
                to: "mailto:me@luc.li",
                text: "Mail",
              },
              {
                to: "/blog",
                text: "Blog",
              },
              {
                to: "/resume",
                text: "Resume",
              },
              {
                to: "https://github.com/yklcs",
                text: "Code",
              },
            ].map(({ text, to }) => (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                `}
              >
                <Link to={to} $underline={false}>
                  {text} ↗
                </Link>
              </div>
            ))}
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
                gap: 2rem;
                margin: 0 0 1rem;
                font-size: 1.125em;

                ${respond(
                  "sm",
                  css`
                    grid-template-columns: 1fr;
                    gap: 1.25rem;
                  `
                )}
              `}
            >
              <div
                css={css`
                  font-weight: 500;
                  font-size: 1.025em;
                `}
              >
                {title}
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
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
    `
  )}
`

const SectionHeader = styled.h2`
  grid-column: 1 / -1;
  margin: 0 -0.025em 4rem 0;
  font-weight: 500;
  font-size: 1.5em;
  line-height: 1;
  letter-spacing: -0.03em;

  ${respond(
    "md",
    css`
      margin: 0 -0.025em 3rem 0;
    `
  )}

  ${respond(
    "sm",
    css`
      margin: 0 -0.025em 2rem 0;
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
      font-size: 1em;
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
