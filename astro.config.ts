import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import { toShikiTheme } from "shiki"
import rehypeMathjax from "rehype-mathjax/svg"

const vscodeTheme = await fetch(
  "https://raw.githubusercontent.com/yklcs/deol-vscode/main/themes/deol-dull-vscode-color-theme.json"
)
const shikiTheme = toShikiTheme(await vscodeTheme.json())

// https://astro.build/config
export default defineConfig({
  site: "https://yklcs.com",
  integrations: [
    sitemap({
      customPages: ["https://yklcs.com/photos"],
    }),
  ],
  experimental: {
    assets: true,
  },
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
    },
    remarkPlugins: ["remark-math"],
    rehypePlugins: [
      [
        rehypeMathjax,
        {
          tex: {
            packages: ["base", "ams", "physics", "mathtools", "configmacros"],
            macros: {
              R: "\\mathbb{R}",
            },
          },
          chtml: {
            fontURL: "/fonts/open",
            scale: 1.14,
          },
          svg: {
            fontCache: "none",
          },
        },
      ],
    ],
  },
})
