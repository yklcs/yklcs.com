import React, { useEffect } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import { Helmet } from "react-helmet"

import Footer from "../components/footer"

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
  margin: 20vh auto 15vh auto;
  padding: 2rem 0;
`

const Message = styled(animated.p)`
  display: inline;
  margin: 0;
  font-size: 2.1em;
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
  color: #a0a0a0;
  font-size: 1.2em;
  letter-spacing: -0.2px;
  text-decoration: none;
  background: none;
  border: none;
  border-radius: 0.6rem;
  outline: inherit;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: #eeeeee;
  }

  &:first-child {
    margin: 0 1rem 0 -0.7rem;
  }
`

const Bio = styled.div`
  display: grid;
  grid-template-rows: 13rem 13rem 13rem;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 40rem) {
    grid-template-rows: 11rem 11rem 11rem 11rem 11rem 11rem;
    grid-template-columns: 1fr;
  }
`

const BioItemTile = styled.a`
  display: block;
  box-sizing: content-box;
  height: 8rem;
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border-radius: 1rem;
  transition: background 0.3s, transform 0.3s;

  &:nth-child(2n) {
    margin: 0 -1.5rem 0 1rem;

    @media screen and (max-width: 40rem) {
      margin: 0 -1rem;
    }
  }

  &:nth-child(2n-1) {
    margin: 0 1rem 0 -1.5rem;

    @media screen and (max-width: 40rem) {
      margin: 0 -0.9rem;
    }
  }

  @media screen and (max-width: 40rem) {
    padding: 0.9rem;
  }

  &:hover {
    background: #eeeeee;
    transform: scale(1.05);
  }
`

const BioItemIcon = styled.img`
  width: 3rem;
  height: 3rem;
`

const BioItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BioItemTitle = styled.span`
  font-size: 1.2em;
`

const BioItemType = styled.span`
  color: #a0a0a0;
  font-size: 1em;
`

const BioItemDescription = styled.p`
  color: #a0a0a0;
  line-height: 1.5;
`

const BioItemHeaderBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 0 1em;
`

const BioItem = ({ title, type, description, imgKey, link }) => (
  <BioItemTile href={link}>
    <BioItemHeader>
      <BioItemIcon
        src={require(`../images/icon-${imgKey}.svg`)}
        alt={imgKey}
        width="512px"
      />
      <BioItemHeaderBar>
        <BioItemTitle>{title}</BioItemTitle>
        <BioItemType>{type}</BioItemType>
      </BioItemHeaderBar>
    </BioItemHeader>
    <BioItemDescription>{description}</BioItemDescription>
  </BioItemTile>
)

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
      <Bio>
        <BioItem
          title="POSTECH"
          type="Education"
          description="Undergraduate program, attending 2021–"
          imgKey="postech"
          link="https://postech.ac.kr"
        />
        <BioItem
          title="Hana Academy Seoul"
          type="Education"
          description="Attended 2018–2020."
          imgKey="hana"
          link="https://hana.hs.kr"
        />
        <BioItem
          title="hmm"
          type="Development"
          description="HAS student webzine. Full stack development, deployed on AWS."
          imgKey="hashmm"
          link="https://hashmm.com"
        />
        <BioItem
          title="KdV Equation PINN"
          type="Research"
          description="Solved the KdV differential equation with physics-informed neural networks."
          imgKey="kdv"
          link="https://hashmm.com"
        />
        <BioItem
          title="luc.li"
          type="Development"
          description="Frontend development with React + Gatsby. Hosted on AWS using CloudFront + S3 + Lambda@Edge."
          imgKey="lucli"
        />
        <BioItem
          title="Navier-Stokes FDM"
          type="Research"
          description="Implemented a FDM solver in Julia for the Navier-Stokes equations."
          imgKey="ns"
        />
      </Bio>
      <Footer />
    </Container>
  )
}

export default IndexPage
