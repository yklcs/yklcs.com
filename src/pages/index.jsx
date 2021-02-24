import React from "react"
import styled from "styled-components"

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2em;
  color: #222222;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`

const Message = styled.p`
  margin: 0.5em 0;
  line-height: 1.5;
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3em 0 0 0;
`

const Link = styled.a`
  margin: 0 1em 0 0;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const IndexPage = () => (
  <Container>
    <Message>
      Lucas Yunkyu Lee is studying and researching computer science at POSTECH,
      Korea.
    </Message>
    <Message>
      He is interested in computational physics and web development, with
      proficiency in Python, JavaScript, Go, and more.
    </Message>
    <Links>
      <Link href="https://github.com/rocketll">GitHub↗</Link>
      <Link href="mailto:me@luc.li">Mail↗</Link>
    </Links>
  </Container>
)

export default IndexPage
