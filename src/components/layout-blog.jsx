import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Code from "./code"

import "katex/dist/katex.min.css"

const components = {
  pre: (props) => <div {...props} />,
  code: Code,
}

const Layout = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default Layout
