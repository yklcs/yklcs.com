const { createFilePath } = require("gatsby-source-filesystem")
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
  createPage({
    ...page,
    context: {
      ...page.context,
      date: new Date().toISOString(),
    },
  })
}
