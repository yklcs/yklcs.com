import type { JSX } from "soar/jsx-runtime";
import { colors } from "./_colors.ts";
import Footer from "./_footer.tsx";
import Wrapper from "./_wrapper.tsx";
import Header from "./_header.tsx";

interface HtmlProps {
  children: JSX.Children;
  generator: string;
  url: string;
}

const Html = ({ children, generator, url }: HtmlProps) =>
  (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="generator" content={generator} />
        <link href="/katex.css" rel="stylesheet" />
      </head>
      <body>
        <Wrapper style="margin: 2rem 0;">
          <Header url={url} />
        </Wrapper>
        <div>{children}</div>
        <Wrapper style="margin: 4rem 0 0 0; border-top: 1px solid; border-color: var(--subsub); padding: 1rem 0;">
          <Footer />
        </Wrapper>
      </body>
    </html>
  ).styled`
  body {
    font-family: Diatype, AsterismSans, system-ui, -apple-system, "Segoe UI",
      Helvetica, sans-serif;
    font-synthesis: none;
    text-size-adjust: none;
    font-size: 16px;
    font-size: clamp(16px, 14.8px + 0.2vw, 18px);
    line-height: 1.45;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: var(--fg);
    background: var(--bg);
    margin:0;
  }

  div {
    min-height: 90vh;
  }

  :root {
    --fg: ${colors.light.fg};
    --bg: ${colors.light.bg};
    --sub: ${colors.light.sub};
    --subsub: ${colors.light.subsub};

    @media (prefers-color-scheme: dark) {
      --fg: ${colors.dark.fg};
      --bg: ${colors.dark.bg};
      --sub: ${colors.dark.sub};
      --subsub: ${colors.dark.subsub};
    }
  }

  :global(a) {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: var(--sub);
    padding: 0.2rem;
    margin: -0.2rem;
    border-radius: 0.2rem;

    &:hover {
      background: var(--subsub);
    }
  }

  ${fontface("Diatype", 400, "normal", true)}
  ${fontface("Diatype", 400, "italic", true)}
  ${fontface("Diatype", 500, "normal", true)}
  ${fontface("Diatype", 500, "italic", true)}
  ${fontface("Diatype", 700, "normal", true)}
  ${fontface("Diatype", 700, "italic", true)}
  ${fontface("AsterismSans", 400, "normal")}
  ${fontface("AsterismSerif", 400, "normal")}
`;

const fontface = (
  family: string,
  weight: number,
  style: string,
  closed = false
) => `
@font-face {
  font-family: ${family};
  font-weight: ${weight};
  font-style: ${style};
  src: url("/fonts${
    closed ? "/closed/" : "/"
  }${family}-${weight}-${style}.woff2") format("woff2");
}
`;

export default Html;
