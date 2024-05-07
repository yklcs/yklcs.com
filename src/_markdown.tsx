import { css, type PageProps } from "soar"
import Html, { breakpoint } from "./_html.tsx"
import Wrapper from "./_wrapper.tsx"
import type { JSX } from "soar/jsx-runtime"

interface MarkdownData {
	title: string
	date?: Date
}

const markdownStyles = css.global`
	.md-wrapper {
		position: relative;

		.side-label {
			all: unset;
			color: var(--accent);
			font-size: 0.8em;
			vertical-align: super;
			line-height: 0;
			margin: -0.1rem 0.1rem;
			font-variant-numeric: tabular-nums;
		}

		.side.show {
			@media screen and (max-width: ${breakpoint}) {
				display: block;
			}
		}

		.side {
			left: 0;
			grid-column: l-side;
			margin: 0 0 1rem 1em;
			font-size: 0.85em;
			display: inline-block;
			position: absolute;

			@media screen and (max-width: ${breakpoint}) {
				display: none;
				color: var(--sub);
				position: static;
				margin: 0.5rem 0;
				padding: 0.5rem 0;
				border-top: 1px solid;
				border-bottom: 1px solid;
				border-color: var(--subsub);
			}

			.katex {
				font-size: ${1.25 * 0.8}rem;
			}

			.side-index {
				color: var(--sub);
				margin: 0 0.75ch 0 0;

				@media screen and (max-width: ${breakpoint}) {
					display: none;
				}
			}
		}

		* {
			grid-column: l-main;
		}

		h1 {
			margin: 0 0 1rem 0;
			font-weight: 400;
		}

		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: 1.5rem 0 -0.25rem 0;
			font-weight: 400;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			text-wrap: balance;
			line-height: 1.2;
		}

		p {
			margin: 0;
		}

		pre {
			overflow: auto hidden;
			margin: 0;

			code {
				background: inherit;
			}
		}

		code {
			background: var(--subsub);
		}

		ol,
		ul {
			margin: 0;
		}

		img {
			border-radius: 0.2rem;
			border: 1px solid;
			border-color: var(--subsub);
			max-width: 100%;
			justify-self: center;
			padding: 0.5rem;
			margin: 0 -0.5rem;

			@media (prefers-color-scheme: dark) {
				filter: invert(1);
				border-color: var(--fg);
			}
		}
	}
`

const Markdown = ({
	children,
	data,
	path,
	context,
}: PageProps & { children?: JSX.Children }) => (
	<Html metadata={{ path, generator: context.generator, title: data.title }}>
		<Wrapper class="md-wrapper" {...markdownStyles}>
			{children}
		</Wrapper>
	</Html>
)

const mdx = (data: MarkdownData) => (props: Omit<PageProps, "data">) => (
	<Markdown {...props} data={data} />
)

export { markdownStyles, mdx }
export default Markdown
