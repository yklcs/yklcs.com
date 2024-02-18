import Html from "./_html.tsx"
import Wrapper from "./_wrapper.tsx"
import type { JSX } from "soar/jsx-runtime"
import { useMDXComponents } from "soar"
import path from "node:path"

useMDXComponents({})

const mdxStyles = `
	&.serif {
		& > * {
			font-family: var(--serif);
		}

		h1 {
			font-family: var(--sans);
			line-height: 1.2;
		}

		h3 {
			font-style: normal;
			font-variant: small-caps;
			font-weight: 700;
			font-size: 1em;
			font-feature-settings: "c2sc";
		}
	}

	* { 
		grid-column: l-main;
	}

	h1 {
		margin: 0 0 1rem 0;
		font-weight: 400;
	}

	h2, h3, h4, h5, h6 {
		margin: 1.5rem 0 -0.25rem 0;
		font-weight: 400
	}

	p {
		margin: 0;
	}

	pre {
		grid-column: wide;
		overflow: auto hidden;
	}
`

interface MdxProps extends JSX.PageProps {
	children: JSX.Children
	meta: {
		title: string
		style?: string
	}
}

const Mdx = ({ children, generator, url, meta }: MdxProps) => {
	const basename = path.basename(url, path.extname(url))

	return (
		<Html metadata={{ url, generator, title: meta.title }}>
			{(
				<Wrapper
					class={`mdx-wrapper${meta.style ? " " : ""}${meta.style ?? ""}`}
				>
					{children}
				</Wrapper>
			).styled`
				:global .mdx-wrapper {
					${mdxStyles}
				}
			`}
		</Html>
	)
}

export { mdxStyles }
export default Mdx
