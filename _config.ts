import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import sass from "lume/plugins/sass.ts"
import lightningcss from "lume/plugins/lightningcss.ts"

const site = lume({
  location: new URL("https://yklcs.com"),
})

site.use(jsx())
site.use(sass())
site.use(lightningcss())

site.copy("static", ".")

export default site
