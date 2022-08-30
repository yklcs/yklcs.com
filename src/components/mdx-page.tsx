import React from "react"
import { format } from "date-fns"
import styled, { css } from "styled-components"
import { MdxFrontmatter } from "../templates/mdx"
import respond from "../utils/responsive"

const Header = (props: MdxFrontmatter): JSX.Element => {
  return (
    <HeaderContainer>
      <div>
        {props.tags &&
          props.tags.map((tag, i) => [i ? " · " : "", <span>{tag}</span>])}
      </div>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
      {props.date && (
        <time
          dateTime={props.date}
          css={css`
            color: #888888;
          `}
        >
          {format(new Date(props.date), "PP")}
        </time>
      )}
    </HeaderContainer>
  )
}

const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 2.5em;
  line-height: 1.1;
  letter-spacing: -0.022em;

  ${respond(
    "sm",
    css`
      font-size: 2.25em;
    `
  )}
`

const Description = styled.p`
  margin: 0;
  font-size: 1.375em;

  ${respond(
    "sm",
    css`
      font-size: 1.25em;
    `
  )}
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;

  @media screen and (max-width: 45rem) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;
  }
`

const Wrapper = styled.div`
  grid-column: 2/4;
  font-family: XCharter, serif;
  letter-spacing: -0.015rem;

  @media screen and (max-width: 65rem) {
    grid-column: 1/4;
  }
`

const Content = styled.div`
  position: relative;
  grid-column: narrow;
  font-size: 1.125em;
  font-family: XCharter, Georgia, serif;

  ${respond(
    "md",
    css`
      grid-column: main;
      width: 75%;
    `
  )}

  ${respond(
    "sm",
    css`
      grid-column: main;
      width: 100%;
      font-size: 1em;
    `
  )}
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: main;
  gap: 1rem 0;
  margin: 2rem 0 4rem;

  ${respond(
    "sm",
    css`
      gap: 0.5rem 0;
      margin: 1rem 0 4rem;
    `
  )}
`

export { Layout, Wrapper, Title, Description, Content, Header }
