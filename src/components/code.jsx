import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import styled from "styled-components"

const Code = ({ children, className }) => {
  const language = className.replace(/language-/, "") || ""

  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.slice(0, -1).map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}

const Pre = styled.pre`
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
  text-align: left;
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  padding-right: 1em;
  text-align: right;
  opacity: 0.5;
  user-select: none;
`

const LineContent = styled.span`
  display: table-cell;
`

export default Code
