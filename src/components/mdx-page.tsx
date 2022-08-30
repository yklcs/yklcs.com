import React from "react"
import { format } from "date-fns"
import styled, { css } from "styled-components"
import { MdxFrontmatter } from "../templates/mdx"
import respond from "../utils/responsive"

const Header = (props: MdxFrontmatter): JSX.Element => {
  return (
    <HeaderContainer>
      <HeaderData>
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
      </HeaderData>
    </HeaderContainer>
  )
}

const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 2.5em;
  line-height: 1.1;
  letter-spacing: -0.022em;
`

const Description = styled.p`
  margin: 0;
  font-size: 1.375em;
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
  font-size: 1.2em;
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
    `
  )}
`

const HeaderData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
`

const HeaderContainer = styled.div`
  grid-column: main;
  gap: 1.5rem;
  margin: 4rem 0 2rem;
`

const Category = styled.div`
  color: ${({ theme }) => theme.neutral.l65};
  font-weight: 700;
  font-size: 0.9em;
  letter-spacing: 0.1ch;
  text-transform: uppercase;
`
const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
  color: ${({ theme }) => theme.neutral.l65};

  > * {
    margin: 0 0.5rem 0 0;
  }
`

export { Layout, Wrapper, Title, Description, Content, Header }
