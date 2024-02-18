import type { JSX } from "soar/jsx-runtime"
import { colors } from "./_colors.ts"
import Footer from "./_footer.tsx"
import Wrapper from "./_wrapper.tsx"
import Header from "./_header.tsx"
import Meta, { type Metadata } from "./_meta.tsx"

interface HtmlProps {
	children: JSX.Children
	metadata: Metadata
}

const Html = ({ children, metadata }: HtmlProps) =>
	(
		<html lang="en">
			<head>
				<Meta {...metadata} />
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width" />
				<link href="/favicon.ico" rel="icon" sizes="48x48" />
				<link href="/favicon.svg" rel="icon" sizes="any" type="image/svg+xml" />
				<link href="/katex.css" rel="stylesheet" />
			</head>
			<body>
				<Wrapper style="margin: 2rem 0;">
					<Header url={metadata.url} />
				</Wrapper>
				<div>{children}</div>
				<Wrapper style="margin: 4rem 0 0 0; border-top: 1px solid; border-color: var(--subsub); padding: 1rem 0;">
					<Footer />
				</Wrapper>
			</body>
		</html>
	).styled`
  body {
    font-family: var(--sans);
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
    --sans: Diatype, AsterismSans, system-ui, -apple-system, "Segoe UI",
      Helvetica, sans-serif;
    --serif: CharisSIL, Charter, Palatino, Georgia, serif;
    --mono: IBMPlexMono, Menlo, "Cascadia Mono", monospace;

    @media (prefers-color-scheme: dark) {
      --fg: ${colors.dark.fg};
      --bg: ${colors.dark.bg};
      --sub: ${colors.dark.sub};
      --subsub: ${colors.dark.subsub};
    }
  }

  :global a {
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

  :global { 
    .katex {
      font-size: 1.25rem;
    }

    .katex-display {
      margin: 0;
      padding: 1px 0 0;
      overflow: auto hidden;
    }
  }

  :global pre, code {
    font-family: var(--mono);
  }

  :global code {
    font-size: 0.91em;
  }

  ${fontface("CharisSIL", 400, "normal")}
  ${fontface("CharisSIL", 400, "italic")}
  ${fontface("CharisSIL", 700, "normal")}
  ${fontface("CharisSIL", 700, "italic")}
  ${fontface("IBMPlexMono", 400, "normal")}
  ${fontface("IBMPlexMono", 400, "italic")}
  ${fontface("IBMPlexMono", 700, "normal")}
  ${fontface("IBMPlexMono", 700, "italic")}
  ${fontface("Diatype", 400, "normal", true)}
  ${fontface("Diatype", 400, "italic", true)}
  ${fontface("Diatype", 500, "normal", true)}
  ${fontface("Diatype", 500, "italic", true)}
  ${fontface("Diatype", 700, "normal", true)}
  ${fontface("Diatype", 700, "italic", true)}
  ${fontface("AsterismSans", 400, "normal")}
  ${fontface("AsterismSerif", 400, "normal")}
`

const fontface = (
	family: string,
	weight: number,
	style: string,
	closed = false,
) => `
@font-face {
  font-family: ${family};
  font-weight: ${weight};
  font-style: ${style};
  src: url("/fonts${closed ? "/closed/" : "/"}${family}-${weight}-${style}.woff2") format("woff2");
}
`

export default Html
