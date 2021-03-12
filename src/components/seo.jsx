import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"
import { Helmet } from "react-helmet"

import stripTrailingSlash from "../utils/strip-trailing-slash"

const SEO = ({ title, description, image }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(
    graphql`
      query SEO {
        site {
          siteMetadata {
            defaultTitle: title
            titleTemplate
            defaultDescription: description
            siteUrl
            defaultImage: image
          }
        }
      }
    `
  )

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
  } = site.siteMetadata

  const metadata = {
    lang: "en",
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${stripTrailingSlash(siteUrl)}${image || defaultImage}`,
    url: stripTrailingSlash(`${siteUrl}${pathname}`),
  }

  return (
    <Helmet
      title={defaultTitle}
      titleTemplate={titleTemplate}
      htmlAttributes={{
        lang: metadata.lang,
      }}
    >
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="image" content={metadata.image} />
      <link rel="canonical" href={metadata.url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.image} />
    </Helmet>
  )
}

export default SEO
