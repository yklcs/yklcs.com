import React from "react"
import { differenceInDays } from "date-fns"
import styled, { css } from "styled-components"
import { Wrapper } from "../components/layout"
import Link from "../components/links"
import respond from "../utils/responsive"

const IndexPage = (): JSX.Element => {
  const serviceBeginDate = new Date("2022-09-19T14:00:00+0900")
  const serviceEndDate = new Date("2024-03-18T14:00:00+0900")

  return (
    <>
      <Wrapper
        css={css`
          min-height: calc(100vh - 15rem);
        `}
      >
        <Section css={css``}>
          <Description>
            Lucas Yunkyu Lee is a student at POSTECH with interests in research,
            development, and design. Currently performing military service under
            the KATUSA program, MOS 11B infantryman.{" "}
            <span
              css={css`
                color: ${({ theme }) => theme.colors.highlight};
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
              align-items: flex-start;
              justify-content: start;
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
              <Link to={to} $underline={false}>
                {text} →
              </Link>
            ))}
          </div>
        </Section>
      </Wrapper>
    </>
  )
}

const Description = styled.p`
  grid-column: span 6;
  margin: 0;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
  margin: 0 0 6rem;
  font-size: 1.25em;

  ${respond(
    "md",
    css`
      margin: 0 0 3rem;
    `
  )}
`

export default IndexPage
