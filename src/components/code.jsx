import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import styled, { useTheme } from "styled-components"

const Code = ({ children, className }) => {
  const theme = useTheme()
  const language = className.replace(/language-/, "") || ""

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme.syntax}
    >
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
  margin: 1rem -0.5rem;
  padding: 0.5rem;
  overflow-x: auto;
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
    monospace;
  text-align: left;
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  padding-right: 1rem;
  text-align: right;
  opacity: 0.5;
  user-select: none;
`

const LineContent = styled.span`
  display: table-cell;
`

export default Code
