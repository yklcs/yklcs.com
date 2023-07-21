interface Meta {
  title: string
  description?: string
  og?: OpenGraph
}

interface OpenGraph {
  title: string
  type: string
  url?: string
  image: string
}

const stripTrailingSlash = (str: string) =>
  str.endsWith("/") ? str.slice(0, -1) : str

const defaultOpenGraph = {
  title: "yklcs.com",
  type: "website",
  image: "/og.png",
}

export { type Meta, defaultOpenGraph }
