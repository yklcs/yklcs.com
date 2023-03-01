import chroma from "chroma-js"

const c = 0.01
const h = 240

const colors = {
  "neutral-90": chroma.oklch(0.87, c, h).hex(),
  "neutral-60": chroma.oklch(0.6, c, h),
  "neutral-10": chroma.oklch(0.3, c, h),
  "neutral-7": chroma.oklch(0.18, c, h).hex(),
}

export default colors
