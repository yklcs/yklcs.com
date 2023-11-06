import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import { type IShikiTheme, toShikiTheme } from "shiki"
import type { KatexOptions } from "rehype-katex/lib"

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
    rehypePlugins: [["rehype-katex", { output: "mathml" } as KatexOptions]],
  },
})
