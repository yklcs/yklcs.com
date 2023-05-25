import chroma from "chroma-js"

const c = 0.0
const h = 240

const colors = {
  "neutral-90": chroma.oklch(0.1, c, h).hex(),
  "neutral-60": chroma.oklch(0.7, c, h),
  "neutral-10": chroma.oklch(0.95, c, h),
  "neutral-7": chroma.oklch(1, c, h).hex(),
}

export default colors
