import React, { useEffect } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import { Helmet } from "react-helmet"

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
  height: 100vh;
  height: var(--100vh);
  margin: auto;
  padding: 2rem 0;
`

const Message = styled(animated.p)`
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

const Links = styled(animated.div)`
  display: flex;
  flex-direction: row;
  margin: 2rem 0 0 0;
`

const Link = styled.a`
  margin: 0 1rem 0 0;
  padding: 0.6rem 0.7rem;
  color: #757575;
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
  const [props, set] = useSpring(() => ({ opacity: 0, y: 100 }))

  useEffect(() => {
    set({
      opacity: 1,
      y: 0,
    })
  }, [set])

  return (
    <Container>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
        title="luc.li - Lucas Yunkyu Lee"
        link={[{ rel: "canonical", href: "https://luc.li" }]}
        meta={[{ name: "description", content: "Lucas Yunkyu Lee" }]}
      />
      <Landing>
        <Message style={props}>
          Hey — I'm{" "}
          <Italic>
            <Emph>Lucas</Emph>
            <Emph> </Emph>
            <Emph>Yunkyu</Emph>
            <Emph> </Emph>
            <Emph>Lee</Emph>
          </Italic>
          , currently studying and researching at POSTECH, Korea. I'm interested
          in computational physics and web development, with proficiency in
          Python, JavaScript, Go, and more.
        </Message>
        <Links style={props}>
          <Link href="https://github.com/rocketll">GitHub</Link>
          <Link href="mailto:me@luc.li">Mail</Link>
        </Links>
      </Landing>
    </Container>
  )
}

export default IndexPage
