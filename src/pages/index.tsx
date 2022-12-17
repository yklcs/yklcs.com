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
          min-height: calc(100vh - 15rem);
        `}
      >
        <Section
          css={css`
            gap: 1rem 0;
            margin: 0 0 6rem;
            font-size: 1.25em;

            ${respond(
              "md",
              css`
                margin: 0 0 3rem;
              `
            )}
          `}
        >
          <Description>
            Lucas Yunkyu Lee is a student at POSTECH with interests in research,
            development, and design. Currently performing military service under
            the KATUSA program, MOS 11B infantryman.{" "}
            <span
              css={css`
                /* stylelint-disable */
                color: hsl(
                  ${elapsedDateRatio(
                      serviceBeginDate,
                      new Date(),
                      serviceEndDate
                    ) * 0.3}turn
                    70% 60%
                );
                /* stylelint-enable */
              `}
            >
              Served for {differenceInDays(new Date(), serviceBeginDate)} days,{" "}
              {differenceInDays(serviceEndDate, new Date())} days until ETS.
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
                text: "Send mail",
              },
              {
                to: "/blog",
                text: "View blog",
              },
              {
                to: "https://github.com/yklcs",
                text: "View code",
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
                  {text} →
                </Link>
              </div>
            ))}
          </div>
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
  grid-column: span 6;
  margin: 0;
`

const Section = styled.div`
  grid-column: main;
  margin: 4.5rem 0;
  ${gridStyle}
`

export default IndexPage
