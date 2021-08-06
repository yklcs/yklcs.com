import React from "react"
import styled, { css } from "styled-components"

import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import { CardType } from "../pages/index"

interface CardProps {
  title: string
  link?: string
  type: CardType
  image?: IGatsbyImageData
  active?: boolean
  width: CardWidth
  background?: boolean
}

const Card = ({
  title,
  link,
  type,
  image,
  width,
  active = true,
  background = false,
}: CardProps): JSX.Element => {
  const content = (
    <>
      {image && (
        <CardImageWrapper background={background}>
          <CardImage background={background} alt={title} image={image} />
        </CardImageWrapper>
      )}
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{type}</CardSubtitle>
    </>
  )

  return (
    <CardContainer active={active} width={width}>
      {link ? <CardLink href={link}>{content}</CardLink> : content}
    </CardContainer>
  )
}

const CardImageWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 10rem;
  opacity: 0.7;
  transition: opacity 0.5s;

  &:hover {
    opacity: 1;
  }

  ${({ background }: { background: boolean }) =>
    background &&
    css`
      background: #eeeeee;
    `}
`

interface CardImageProps {
  background: boolean
}

const CardImage = styled(GatsbyImage)`
  ${({ background }: CardImageProps) =>
    background &&
    `
    width: 50%;
    margin: auto;
    box-shadow: 0 0 1rem 0.25rem #00000022;
  `}
`

const CardLink = styled.a`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  height: 100%;
  color: ${({ theme }) => theme.neutral.l15};
  text-decoration: none;
`

type CardWidth = 1 | 2 | 3 | 4

interface CardContainerProps {
  width: CardWidth
  active: boolean
}

const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  grid-column: span ${({ width }) => width};
  line-height: 1.3;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  filter: ${({ active }) => (active ? "none" : "blur(4px)")};
  transition: opacity 0.5s, filter 0.5s;
  pointer-events: ${({ active }) => (active ? "default" : "none")};
`

const CardTitle = styled.span`
  margin: 0.5rem 0 0 0;
`

const CardSubtitle = styled.span`
  color: ${({ theme }) => theme.neutral.l65};
`

export default Card
