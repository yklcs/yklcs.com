import Color from "colorjs.io"

const neutral = new Color("lch", [50, 2, 280])

const colors = {
  "neutral-90": neutral.clone().set("lch.l", 90).to("srgb"),
  "neutral-60": neutral.clone().set("lch.l", 60).to("srgb"),
  "neutral-10": neutral.clone().set("lch.l", 10).to("srgb"),
  "neutral-7": neutral.clone().set("lch.l", 7).to("srgb"),
}

export default colors
