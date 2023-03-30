import { defineConfig } from "astro/config"
import { type IShikiTheme, toShikiTheme } from "shiki"

const vscodeTheme = await fetch(
  "https://raw.githubusercontent.com/yklcs/deol-vscode/main/themes/deol-dull-vscode-color-theme.json"
)
const shikiTheme = toShikiTheme(await vscodeTheme.json())
shikiTheme.settings[3].settings.fontStyle = "underline" // https://github.com/withastro/astro/issues/6383

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
    },
  },
})
