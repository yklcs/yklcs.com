const siteUrl = new URL("https://luc.li")

module.exports = {
  siteMetadata: {
    title: "Lucas Yunkyu Lee",
    titleTemplate: "%s – luc.li",
    siteUrl: siteUrl.href,
    description: "Website of Lucas Yunkyu Lee",
    image: "/images/cover.png",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
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
    "gatsby-plugin-preact",
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
        path: "./content/blog/",
      },
      __key: "blog",
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./content/blog/",
      },
    },
  ],
}
