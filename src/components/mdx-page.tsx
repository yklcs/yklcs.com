import React from "react"
import { format } from "date-fns"
import styled, { css } from "styled-components"
import { MdxFrontmatter } from "../templates/mdx"
import respond from "../utils/responsive"

const Header = (props: MdxFrontmatter): JSX.Element => {
  return (
    <HeaderContainer>
      <Title>{props.title}</Title>
      {props.description && <Description>{props.description}</Description>}
      <div>
        <div>
          {props.tags &&
            props.tags.map((tag, i) => [i ? " · " : "", <span>{tag}</span>])}
        </div>
        {props.date && (
          <time
            dateTime={props.date}
            css={css`
              color: ${({ theme }) => theme.colors.subtext};
            `}
          >
            {format(new Date(props.date), "PP")}
          </time>
        )}
      </div>
    </HeaderContainer>
  )
}

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.2;

  ${respond(
    "sm",
    css`
      font-size: 2em;
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

const Content = styled.div`
  font-size: 1.25em;

  ${respond(
    "sm",
    css`
      font-size: 1.125em;
    `
  )}
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: main;
  gap: 1rem 0;
  margin: 2rem 0 4rem;
`

export { Layout, Title, Description, Content, Header }
