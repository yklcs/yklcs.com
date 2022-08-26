import React, { HTMLProps } from "react"
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import styled, { useTheme } from "styled-components"

const Code = ({ children, className = "" }: HTMLProps<HTMLElement>) => {
  console.log(className)
  const theme = useTheme()
  const language = className.replace(/language-/, "") || ""

  return language ? (
    <Highlight
      {...defaultProps}
      code={children as string}
      language={language as Language}
      theme={theme.syntax}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Div className={className} style={style}>
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
        </Div>
      )}
    </Highlight>
  ) : (
    <code>{children}</code>
  )
}

const Div = styled.div`
  margin: 1rem -0.5rem;
  padding: 0.5rem;
  overflow-x: auto;
  font-family: Iosevka, Menlo, Consolas, monospace;
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
