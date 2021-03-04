import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { Helmet } from "react-helmet"
import { StaticImage } from "gatsby-plugin-image"

const Container = styled.div`
  margin: 10rem 0 0 0;
  font-size: 1.1em;
  line-height: 1.5;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 4em 0;
`

const Title = styled.div`
  flex-basis: 13.333333rem;
  flex-grow: 1;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
`

const Content = styled.div`
  display: flex;
  flex-basis: 26.666666rem;
  flex-direction: column;
  flex-grow: 2;
`

const linkStyle = css`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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
  margin: 0.5rem 0;

  &:first-child {
    margin: 0;
  }
`

const ContentItemText = styled.span`
  word-wrap: break-word;
`

const ImageContainer = styled.div`
  margin: 1rem 0;
  box-shadow: 0 5px 16px 5px #00000033;
`

const ContentItem = ({ children, title, text }) => (
  <ContentItemDiv>
    {title && <i>{title}</i>}
    {text ? <ContentItemText>{children}</ContentItemText> : children}
  </ContentItemDiv>
)

const Resume = () => (
  <Container>
    <Row>
      <Title>Lucas Yunkyu Lee</Title>
      <Content>
        <ContentItem>
          <ALink href="mailto:me@luc.li">me@luc.li</ALink>
          <InternalLink to="/">https://luc.li/</InternalLink>
          <span>Seoul, Korea</span>
        </ContentItem>
      </Content>
    </Row>
    <Row>
      <Title>Education</Title>
      <Content>
        <ContentItem>
          <span>POSTECH, 2021–</span>
          <span>Hana Academy Seoul, 2018–2020</span>
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
      <Title>Experience</Title>
      <Content>
        <ContentItem title="hashmm.com">
          <i>— Project Manager, Lead Developer</i>
          <ImageContainer>
            <StaticImage
              src="../images/hashmm-screenshot.png"
              alt="hashmm.com screenshot"
              layout="fullWidth"
            />
          </ImageContainer>

          <span>Hana Academy Seoul student webzine.</span>
        </ContentItem>
      </Content>
    </Row>
  </Container>
)

export default Resume
