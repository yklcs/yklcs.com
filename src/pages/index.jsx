import React from "react"
import styled from "styled-components"
import { useSpring } from "react-spring"
import { navigate } from "@reach/router"

const Container = styled.main`
  max-width: 50em;
  margin: auto;
  padding: 0rem 2rem;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: var(--100vh);
  height: 100vh;
  margin: auto;
  padding: 2rem 0;
`

const CV = styled.div`
  box-sizing: border-box;
  height: var(--100vh);
  height: 100vh;
  margin: auto;
  padding: 2rem 0;
`

const Message = styled.p`
  display: inline;
  margin: 0;
  font-size: 2em;
  font-family: "Apple Garamond", serif;
  line-height: 1.25;
`

const Italic = styled.span`
  font-style: italic;
`

const Emph = styled.span`
  position: relative;

  &:after {
    position: absolute;
    top: 0.4em;
    right: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 0.4em;
    background: #eeff00;
    content: "";
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0 0 0;
`

const Link = styled.a`
  margin: 0 1rem 0 0;
  padding: 0.6rem 0.7rem;
  color: #777777;
  font-size: 1.2em;
  letter-spacing: -0.2px;
  text-decoration: none;
  background: none;
  border: none;
  border-radius: 0.6rem;
  outline: inherit;
  cursor: pointer;

  &:hover {
    background: #eeeeee;
  }

  &:first-child {
    margin: 0 1rem 0 -0.6rem;
  }
`

const IndexPage = () => {
  const [, set] = useSpring(() => ({ y: 0 }))

  return (
    <Container>
      <Landing>
        <Message>
          Hey — I'm{" "}
          <Italic>
            <Emph>Lucas </Emph>
            <Emph>Yunkyu </Emph>
            <Emph>Lee</Emph>
          </Italic>
          , currently studying and researching at POSTECH, Korea. I'm interested
          in computational physics and web development, with proficiency in
          Python, JavaScript, Go, and more.
        </Message>
        <Links>
          <Link
            as="button"
            onClick={() => {
              set({
                y: window.innerHeight,
                from: { y: window.scrollY },
                reset: true,
                onChange: ({ y }) => window.scroll(0, y),
                onRest: () => navigate("#cv"),
              })
            }}
          >
            CV
          </Link>
          <Link href="https://github.com/rocketll">GitHub</Link>
          <Link href="mailto:me@luc.li">Mail</Link>
        </Links>
      </Landing>
      <CV id={"cv"}>
        Under construction...{" "}
        <span role="img" aria-label="construction sign">
          🚧
        </span>
      </CV>
    </Container>
  )
}

export default IndexPage
