import Color from "colorjs.io"

const neutral = new Color("lch", [50, 2, 280])

const colors = {
  "neutral-90": neutral.clone().set("lch.l", 90),
  "neutral-70": neutral.clone().set("lch.l", 60),
  "neutral-10": neutral.clone().set("lch.l", 10),
  "neutral-7": neutral.clone().set("lch.l", 7),
}

export default colors
