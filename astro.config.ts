import { defineConfig } from "astro/config"
import { type IShikiTheme, toShikiTheme } from "shiki"

const vscodeTheme = await fetch(
  "https://raw.githubusercontent.com/yklcs/deol-vscode/main/themes/deol-vscode-color-theme.json"
)
const shikiTheme = toShikiTheme(await vscodeTheme.json())
shikiTheme.settings[3].settings.fontStyle = "underline" // https://github.com/withastro/astro/issues/6383

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
    },
  },
})
