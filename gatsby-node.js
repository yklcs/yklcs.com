const { createFilePath } = require("gatsby-source-filesystem")
const path = require("node:path")
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))

exports.onCreateWebpackConfig = ({ actions }) => {
  const gatsbyNodeModules = require("path").resolve(
    require("fs").realpathSync("node_modules/gatsby"),
    ".."
  )

  actions.setWebpackConfig({
    resolve: {
      modules: [gatsbyNodeModules, "node_modules"],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === "Mdx" &&
    node.internal.contentFilePath.includes("/blog/")
  ) {
    const slug = replacePath(
      createFilePath({
        node,
        getNode,
        basePath: "src/pages/blog",
        trailingSlash: false,
      })
    )
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)

  const isMdx = /\.mdx$/.test(page.componentPath)

  createPage({
    ...page,
    component: isMdx
      ? `${path.resolve("./src/templates/mdx.tsx")}?__contentFilePath=${
          page.component
        }`
      : page.component,
    context: {
      ...page.context,
      date: new Date().toISOString(),
    },
  })
}
