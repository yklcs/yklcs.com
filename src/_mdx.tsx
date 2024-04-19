import { css } from "soar"
import Html, { breakpoint } from "./_html.tsx"
import Wrapper from "./_wrapper.tsx"
import type { JSX } from "soar/jsx-runtime"

interface MdxMeta {
	title: string
	style?: string
}

interface MdxProps extends JSX.PageProps {
	children: JSX.Children
	meta: MdxMeta
}

const mdxStyles = css.global`
	.mdx-wrapper {
		position: relative;

		.side-label {
			all: unset;
			font-size: 0.8em;
			vertical-align: super;
			line-height: 0;
			margin: -0.1rem 0.1rem;
			font-variant-numeric: tabular-nums;

			@media screen and (max-width: ${breakpoint}) {
				line-height: inherit;
				margin: -0.2rem 0.1rem -0.1rem;
				vertical-align: baseline;
				background: var(--subsub);
				padding: 0.2rem 0.5rem;
				border-radius: 0.2rem;
			}
		}

		.side.show {
			@media screen and (max-width: ${breakpoint}) {
				display: block;
			}
		}

		.side {
			position: absolute;
			left: 0;
			grid-column: l-side;
			margin: 0 0 1rem 1em;
			font-size: 0.9em;

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
				font-size: ${1.25 * 0.9}rem;
			}

			.side-index {
				color: var(--sub);
				margin: 0 0 0 -1.5ch;

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
			grid-column: wide;
			overflow: auto hidden;

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
			width: 100%;
		}
	}
`

const Mdx = ({ children, generator, url, meta }: MdxProps) => {
	return (
		<Html metadata={{ url, generator, title: meta.title }}>
			<Wrapper
				class={`mdx-wrapper${meta.style ? " " : ""}${meta.style ?? ""}`}
				{...mdxStyles}
			>
				{children}
			</Wrapper>
		</Html>
	)
}

const mdxLayout = (meta: MdxMeta) => (props: Omit<MdxProps, "meta">) => (
	<Mdx {...props} meta={meta} />
)

export { mdxStyles, mdxLayout }
export default Mdx
