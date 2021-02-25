import React, { useRef } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { useSpring, animated } from "react-spring"

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
  }
`

const Container = styled(animated.main)`
  height: 100vh;
  padding: 0rem 1rem;
  overflow: scroll;
  scroll-snap-type: y mandatory;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  max-width: 60em;
  height: 100vh;
  margin: auto;
  padding: 2rem 0;
  scroll-snap-align: start;
`

const CV = styled.div`
  max-width: 60em;
  height: 100vh;
  margin: auto;
  padding: 2rem 0;
  scroll-snap-align: start;
`

const Message = styled.p`
  display: inline;
  margin: 0;
  color: #333333;
  font-size: 2.3em;
  font-family: "Apple Garamond", serif;
  line-height: 1.5;
`

const Italic = styled.span`
  font-style: italic;
`

const Sub = styled.span`
  position: relative;
  color: #aaaaaa;
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
  justify-content: space-between;
  margin: 0;
`

const Link = styled.a`
  margin: 0 1em 0 0;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const TextButton = styled.button`
  display: inline-block;
  color: inherit;
  font-size: inherit;
  background: inherit;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const ScrollButton = ({ children, set }) => {
  return (
    <TextButton
      onClick={() => {
        set({ scroll: window.innerHeight, from: { scroll: 0 } })
      }}
    >
      {children}
    </TextButton>
  )
}

const IndexPage = () => {
  const [props, set] = useSpring(() => ({ scroll: 0 }))

  return (
    <Container scrollTop={props.scroll}>
      <GlobalStyle />
      <Landing>
        <Message>
          <Italic>Lucas Yunkyu Lee</Italic> is studying and researching at{" "}
          <Emph>POSTECH</Emph>, Korea.{" "}
          <Sub>
            He is interested in computational physics and web development, with
            proficiency in Python, JavaScript, Go, and more.
          </Sub>
        </Message>
        <Links>
          <ScrollButton set={set}>CV↓</ScrollButton>
          <Link href="https://github.com/rocketll">GitHub→</Link>
          <Link href="mailto:me@luc.li">Mail→</Link>
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
