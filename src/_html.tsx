import type { JSX } from "soar/jsx-runtime"
import { css } from "soar"
import { colors } from "./_colors.ts"
import Footer from "./_footer.tsx"
import Wrapper from "./_wrapper.tsx"
import Header from "./_header.tsx"
import Meta, { type Metadata } from "./_meta.tsx"

interface HtmlProps {
	children: JSX.Children
	metadata: Metadata
}

const Html = ({ children, metadata }: HtmlProps) => (
	<html lang="en">
		<head>
			<base
				href={`${metadata.path}${metadata.path.endsWith("/") ? "" : "/"}`}
			/>
			<Meta {...metadata} />
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width" />
			<link href="/favicon.ico" rel="icon" sizes="48x48" />
			<link href="/favicon.svg" rel="icon" sizes="any" type="image/svg+xml" />
			<link href="/_katex.css" rel="stylesheet" />
		</head>
		<body {...style.body} {...globalStyle}>
			<Wrapper class="border-wrapper">
				<div {...style.border} />
			</Wrapper>
			<Wrapper style="margin: 2rem 0;">
				<Header url={metadata.path} />
			</Wrapper>
			<div {...style.fill}>{children}</div>
			<Wrapper style="margin: 6rem 0 0 0;">
				<Footer />
			</Wrapper>
			<script src="/index.js" />
		</body>
	</html>
)

const style = {
	body: css`
		font-family: var(--sans);
		font-synthesis: none;
		text-size-adjust: none;
		font-size: 16px;
		font-size: clamp(15px, 14px + 0.2vw, 18px); /* 500-2000px  */
		line-height: 1.5;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		color: var(--fg);
		background: var(--bg);
		margin: 0;

		@media print {
			font-size: 0.8em;
			-webkit-print-color-adjust: exact;
		}
	`,
	fill: css`
		min-height: 90vh;
	`,
	border: css`
		border-left: 1px solid;
		border-right: 1px solid;
		border-color: var(--subsub);
		margin: 0 -2rem;
		grid-column: wide;
		box-sizing: content-box;

		@media print {
			display: none;
		}
	`,
}

const fontface = (
	family: string,
	weight: number,
	style: string,
	closed = false,
	sizeAdjust = 100,
) => `
  @font-face {
    font-family: ${family};
    font-weight: ${weight};
    font-style: ${style};
    size-adjust: ${sizeAdjust}%;
    src: url("/fonts${closed ? "/closed/" : "/"}${family}-${weight}-${style}.woff2")
      format("woff2");
  }
`

const fontfaceVariable = (family: string, closed = false, sizeAdjust = 100) => `
  @font-face {
    font-family: ${family};
    size-adjust: ${sizeAdjust}%;
    src: url("/fonts${closed ? "/closed/" : "/"}${family}.woff2")
      format("woff2-variations");
  }
`

const globalStyle = css.global`
	:root {
		--fg: ${colors.light.fg};
		--bg: ${colors.light.bg};
		--sub: ${colors.light.sub};
		--subsub: ${colors.light.subsub};
		--accent: ${colors.light.accent};

		--sans: GTAmerica, SourceHanSansKRVariable, system-ui, -apple-system,
			"Segoe UI", Helvetica, sans-serif;
		--mono: IBMPlexMono, Menlo, "Cascadia Mono", monospace;

		@media screen and (prefers-color-scheme: dark) {
			--fg: ${colors.dark.fg};
			--bg: ${colors.dark.bg};
			--sub: ${colors.dark.sub};
			--subsub: ${colors.dark.subsub};
			--accent: ${colors.dark.accent};
		}

		@media print {
			--fg: #000000;
			--bg: #ffffff;
		}
	}

	${fontface("GTAmerica", 400, "normal", true)}
	${fontface("GTAmerica", 400, "italic", true)}
  ${fontface("IBMPlexMono", 400, "normal", false, 98)}
  ${fontface("IBMPlexMono", 400, "italic", false, 98)}
  ${fontface("IBMPlexMono", 700, "normal", false, 98)}
  ${fontface("IBMPlexMono", 700, "italic", false, 98)}
  ${fontfaceVariable("SourceHanSansKRVariable", false, 90)}

	a {
		color: var(--accent);
		text-decoration: none;
		padding: 0.2rem;
		margin: -0.2rem;
		border-radius: 0.2rem;

		&:hover {
			background: var(--subsub);
		}
	}

	.katex {
		font-size: 1.15em;
	}

	.katex-display {
		margin: 0;
		padding: 1px 0 0;
		overflow: auto hidden;
	}

	pre,
	code {
		font-family: var(--mono);
	}

	pre {
		font-size: 0.85em;
	}

	p {
		hyphens: auto;
	}

	.border-wrapper {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
		box-sizing: border-box;
	}
`

const breakpoint = "40rem"

export { breakpoint }
export default Html
