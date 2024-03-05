import type { JSX } from "soar/jsx-runtime"
import Html from "../_html.tsx"
import Wrapper from "../_wrapper.tsx"
import { format } from "date-fns"
import { globby } from "globby"
import path from "path"
import type { MDXProps } from "mdx/types.js"

const Page = async ({ url, generator }: JSX.PageProps) => {
	const grouped = group(posts, (post) => post.date.getFullYear().toString())
	const Group = ({ group }: { group: PostMeta[] }) =>
		(
			<div class="group">
				{group.map((post) => (
					<div class="post">
						<a href={post.url}>{post.title}</a>
						<time datetime={post.date.toISOString()}>
							{format(post.date, "MMM d, yyyy")}
						</time>
					</div>
				))}
			</div>
		).styled`
      div.group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      div.post {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        time {
          color: var(--sub);
        }
      }
    `

	return (
		<Html metadata={{ url, generator, title: "Blog" }}>
			<Wrapper>
				{Object.entries(grouped)
					.sort(([a], [b]) => b.localeCompare(a))
					.map(
						([year, group]) =>
							(
								<>
									<h2>{year}</h2>
									<Group group={group} />
								</>
							).styled`
            h2 {
              font-size: 1em;
              font-weight: 400;
              margin: 0;
              grid-column: r-side;
              color: var(--sub);
            }
          `,
					)}
			</Wrapper>
		</Html>
	)
}

interface PostMeta {
	url: string
	title: string
	date: Date
	[key: string]: unknown
}

interface PostModule {
	default: JSX.FunctionalElement<MDXProps>
	meta: PostMeta
}

const files = await globby([path.join(import.meta.dirname, "**/*.{mdx, md}")])
const pages: PostModule[] = await Promise.all(
	files.map(async (file) => {
		const rel = path.relative(import.meta.dirname, file)
		const mod: PostModule = await import(`./${rel}`)
		const slug =
			path.basename(rel) === "index.mdx"
				? path.dirname(rel)
				: path.basename(rel, path.extname(rel))
		Object.assign(mod.meta, { url: path.join("/blog", slug) })
		return mod
	}),
)
const posts: PostMeta[] = pages
	.map((mod) => mod.meta)
	.sort((a, b) => b.date.valueOf() - a.date.valueOf())

const group = <T,>(
	arr: T[],
	fn: (element: T, index: number, array: T[]) => string,
): Record<string, T[]> =>
	arr.reduce(
		(acc, element, index, array) => {
			acc[fn(element, index, array)] = acc[fn(element, index, array)] || []
			acc[fn(element, index, array)].push(element)
			return acc
		},
		{} as {
			[key: string]: T[]
		},
	)

export default Page
export { posts }
