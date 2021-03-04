import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { Helmet } from "react-helmet"
import { StaticImage } from "gatsby-plugin-image"
import Sticky from "react-stickynode"

const Container = styled.div`
  margin: 10rem 0 0 0;
  font-size: 1em;
  line-height: 1.5;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 4rem 0;

  &:first-of-type {
    margin: 2rem 0 4rem 0;
  }
`

const TitleDiv = styled.div`
  flex-basis: 13.333333rem;
  flex-grow: 1;
  margin: 0 0 0.5rem 0;
`

const TitleText = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: inherit;
`

const Title = ({ children, main }) => (
  <TitleDiv>
    <TitleText as={main ? "h1" : "h2"}>{children}</TitleText>
  </TitleDiv>
)

const Content = styled.div`
  display: flex;
  flex-basis: 26.666666rem;
  flex-direction: column;
  flex-grow: 2;
`

const linkStyle = css`
  display: inline-flex;
  box-sizing: border-box;
  margin: -0.1em -0.4em;
  padding: 0.1em 0.4em;
  color: inherit;
  text-decoration: underline;
  text-decoration-color: #6196f2;
  border-radius: 0.6rem;
  transition: background 0.3s;

  &:hover {
    background: #f0f0f0;
  }
`

const ALink = styled.a`
  ${linkStyle}
`

const InternalLink = styled(Link)`
  ${linkStyle}
`

const ContentItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${(props) => (props.large ? "2" : "0.5")}rem 0;

  &:first-child {
    margin: 0 0 ${(props) => (props.large ? "2" : "0.5")}rem 0;
  }
`

const ContentItemTitle = styled.h3`
  margin: 0;
  font-weight: 400;
  font-size: inherit;
  font-style: italic;
`

const ContentItemText = styled.p`
  margin: 0;
`
const ContentItem = ({ children, title, text, large }) => (
  <ContentItemDiv large={large}>
    {title && <ContentItemTitle>{title}</ContentItemTitle>}
    {text ? <ContentItemText>{children}</ContentItemText> : children}
  </ContentItemDiv>
)

const imageStyle = {
  borderRadius: "0.7rem",
}

const imageWrapperStyle = {
  margin: "0 0 1rem 0",
  width: "100%",
  boxShadow: "0 0.5rem 1.1rem 0.4rem #00000020",
  ...imageStyle,
}

const Resume = () => {
  const [bp, setBp] = useState(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia("screen and (min-width: 44rem)")
    setBp(mediaQueryList.matches)
    mediaQueryList.addEventListener("change", (event) => {
      setBp(event.matches)
    })
  }, [])

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
      <InternalLink
        to="/"
        css={`
          color: #a0a0a0;
          text-decoration: none;
        `}
      >
        ← home
      </InternalLink>
      <Row>
        <Title main>
          <Emph>Lucas Yunkyu Lee</Emph>
        </Title>
        <Content>
          <ContentItem>
            <ALink href="mailto:me@luc.li">me@luc.li</ALink>
            <InternalLink to="/">https://luc.li/</InternalLink>
            <ContentItemText>Seoul, Korea</ContentItemText>
          </ContentItem>
        </Content>
      </Row>
      <Row>
        <Title>Education</Title>
        <Content>
          <ContentItem>
            <ContentItemText>POSTECH, 2021–</ContentItemText>
            <ContentItemText>Hana Academy Seoul, 2018–2020</ContentItemText>
          </ContentItem>
        </Content>
      </Row>
      <Row>
        <Title>Skills</Title>
        <Content>
          <ContentItem text title="Fully Proficient Languages">
            JavaScript, Python, TeX
          </ContentItem>
          <ContentItem text title="Novice Languages">
            Go, Java, Julia, C, TypeScript, Mathematica, MATLAB
          </ContentItem>
          <ContentItem text title="Cloud Computing">
            AWS (S3, CloudFront, Lambda@Edge, Amplify, EC2, Route53)
          </ContentItem>
          <ContentItem text title="Web Frontend Technologies">
            React, Gatsby, ES6+, SASS, CSS-in-JS, Babel, Webpack
          </ContentItem>
          <ContentItem text title="Web Backend Technologies">
            Go, Django, Express, Apache, Nginx
          </ContentItem>
          <ContentItem text title="Web Integrations">
            Ghost, Wordpress, Google Workspace, Microsoft 365
          </ContentItem>
          <ContentItem text title="Systems">
            macOS, Linux (Arch, Ubuntu), Windows 10, Raspberry Pi, Arduino
          </ContentItem>
          <ContentItem text title="Tooling">
            Git, Github Actions
          </ContentItem>
        </Content>
      </Row>
      <Row>
        <Title>
          <Sticky top={100} enabled={bp}>
            Experience
          </Sticky>
        </Title>
        <Content>
          <ContentItem
            title={<ALink href="https://hashmm.com">hashmm.com</ALink>}
            large
          >
            <ContentItemText>
              2020 – Project Manager + Lead Developer
            </ContentItemText>
            <p>
              Led a small team to create and develop hashmm.com, the Hana
              Academy Seoul student webzine. Used Ghost for effective content
              management and SEO, maximizing traffic and exposure. Deployed onto
              AWS EC2 and served via AWS CloudFront for performance and
              scalability.
            </p>
            <StaticImage
              src="../images/hashmm-screenshot.png"
              alt="hashmm.com screenshot"
              layout="fullWidth"
              style={imageWrapperStyle}
              imgStyle={imageStyle}
            />
          </ContentItem>
          <ContentItem title="Interactive Epidemiology Model" large>
            <ContentItemText>2020 – Lead Developer</ContentItemText>
            <p>
              Participated in creating a website showing the SIR model and its
              variants in epidemiology. Solved the SIR differential equation
              through numerical analysis and visualized the results
              interactively. Frontend developed in React using Ant Design.
            </p>
            <video
              style={{ width: "100%", ...imageWrapperStyle }}
              autoPlay
              loop
              muted
              playsInline
              poster={require("../images/sir-screenshot.png")}
            >
              <source
                src={require("../images/sir-movie.mp4").default}
                type="video/mp4"
              />
            </video>
          </ContentItem>
          <ContentItem title="Korea Young Physicists' Tournament" large>
            <ContentItemText>2019 – Team Member</ContentItemText>
            <ContentItemText>2020 – Team Captain</ContentItemText>
            <p>
              Participated in KYPT 2019 as a team member and in KYPT 2020 as the
              team captain. Represented Hana Academy Seoul in Team ForMAT,
              winning Gold and Grand prizes. Leveraged skills in programming and
              technical computing in addition to physical knowledge, conducting
              calculations and visualizations through Python, MATLAB,
              Mathematica, Julia, and more.
            </p>
          </ContentItem>
          <ContentItem title="KdV Equation PINN" large>
            <ContentItemText>2019</ContentItemText>
            <p>
              Solved the KdV differential equation with physics-informed neural
              networks togther with a partner. Succeeded in superior performance
              compared to traditional numerical methods (Crank-Nicolson).
              Implemented in Python using DeepXDE and Tensorflow, with
              processing and utilities from MATLAB.
            </p>
            <StaticImage
              src="../images/kdvpinn.png"
              alt="hashmm.com screenshot"
              layout="fullWidth"
              style={imageWrapperStyle}
              imgStyle={imageStyle}
            />
          </ContentItem>
        </Content>
      </Row>
    </Container>
  )
}

export default Resume
