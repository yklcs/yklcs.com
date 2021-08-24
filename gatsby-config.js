const siteUrl = new URL("https://luc.li")

module.exports = {
  siteMetadata: {
    title: "Lucas Yunkyu Lee",
    titleTemplate: "%s – luc.li",
    siteUrl: siteUrl.href,
    description: "Website of Lucas Yunkyu Lee",
    image: "/images/cover.png",
    firstName: "Lucas Yunkyu",
    lastName: "Lee",
    username: "rocketll",
    gender: "male",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-remark-images",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/templates/page.tsx"),
          blog: require.resolve("./src/templates/blog.tsx"),
        },
        remarkPlugins: [require("remark-math")],
        rehypePlugins: [require("rehype-katex")],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
            },
          },
        ],
      },
    },
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-SKY9NLT5FT"],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./content/blog",
      },
      __key: "blog",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "page",
        path: "./content/pages",
      },
      __key: "page",
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./content/pages",
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./content",
        ignore: {
          patterns: ["!blog/**/*"],
        },
      },
    },
    "gatsby-plugin-remove-trailing-slashes",
  ],
}
