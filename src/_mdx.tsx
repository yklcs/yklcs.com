import Html from "./_html.tsx"
import Wrapper from "./_wrapper.tsx"
import type { JSX } from "soar/jsx-runtime"
import { useMDXComponents } from "soar"

useMDXComponents({})

const mdxStyles = `
	* { 
		grid-column: l-main;
	}

	h1 {
		margin: 0;
		font-weight: 400;
	}

	h2, h3, h4, h5, h6 {
		margin: 1.5rem 0 -0.25rem 0;
		font-weight: 400
	}

	p {
		margin: 0;
	}
`

const Mdx = ({
	children,
	generator,
	url,
}: { children: JSX.Children } & JSX.PageProps) => {
	return (
		<Html url={url} generator={generator}>
			{(<Wrapper class="mdxWrapper">{children}</Wrapper>).styled`
				:global .mdxWrapper {
					${mdxStyles}
				}
			`}
		</Html>
	)
}

export { mdxStyles }
export default Mdx
