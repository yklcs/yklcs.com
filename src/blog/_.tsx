import type { JSX } from "soar/jsx-runtime"
import Html from "../_html.tsx"
import Wrapper from "../_wrapper.tsx"
import { globby } from "globby"
import path from "node:path"
import type { MDXProps } from "mdx/types.js"
import { mdxStyles } from "../_mdx.tsx"

const files = await globby([path.join(import.meta.dirname, "**/*.{mdx, md}")])

const pages: Record<string, PostModule> = Object.assign(
	{},
	...(await Promise.all(
		files.map(async (file) => {
			const rel = path.relative(import.meta.dirname, file)
			const mod = await import(`./${rel}`)
			const slug = rel.slice(1, -path.extname(rel).length)
			Object.assign(mod.meta, { url: `/blog/${slug}` })
			return { [slug]: mod }
		}),
	)),
)

interface PostModule {
	default: JSX.FunctionalElement<MDXProps>
	meta: PostMeta
}

interface PostMeta {
	url: string
	title: string
	date: Date
	[key: string]: unknown
}

const posts: PostMeta[] = Object.entries(pages)
	.map(([_slug, mod]) => mod.meta)
	.sort((a, b) => b.date.valueOf() - a.date.valueOf())

const generator = Object.assign(
	{},
	...Object.entries(pages).map(([slug, { meta, default: Mdx }]) => ({
		[slug]: async ({ url, generator }: JSX.PageProps) => (
			<Html metadata={{ url, generator, title: meta.title, type: "article" }}>
				{(
					<Wrapper
						class={`mdx-wrapper${meta.style ? " " : ""}${meta.style ?? ""}`}
					>
						<>
							<h1>{meta.title}</h1>
							<Mdx components={{}} />
						</>
					</Wrapper>
				).styled`
					:global .mdx-wrapper {
						${mdxStyles}
					}
				`}
			</Html>
		),
	})),
)

export { type PostMeta, posts }
export default generator
