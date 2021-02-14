const siteUrl = new URL("https://luc.li")

siteUrl.toString
module.exports = {
  siteMetadata: {
    title: "luc.li",
    siteUrl: siteUrl.href,
    description: "Website of Lucas Yunkyu Lee"
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
          bucketName: "luc.li",
          protocol: siteUrl.protocol.slice(0, -1),
          hostname: siteUrl.hostname
      },
  },
  ],
};
