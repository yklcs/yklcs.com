import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"

import { toShikiTheme } from "shiki"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

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
    mdx({}),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/vars.scss";`,
        },
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
    },
    remarkRehype: {
      clobberPrefix: "",
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})
