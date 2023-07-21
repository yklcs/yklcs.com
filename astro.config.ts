import { defineConfig } from "astro/config"
import { type IShikiTheme, toShikiTheme } from "shiki"

const vscodeTheme = await fetch(
  "https://raw.githubusercontent.com/yklcs/deol-vscode/main/themes/deol-dull-vscode-color-theme.json"
)
const shikiTheme = toShikiTheme(await vscodeTheme.json())

// https://astro.build/config
export default defineConfig({
  site: "https://yklcs.com",
  experimental: {
    assets: true,
  },
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
    },
  },
})
