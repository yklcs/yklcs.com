import Html from "./_html.tsx"
import Wrapper from "./_wrapper.tsx"
import { format } from "date-fns"
import { css, type File, type PageProps } from "soar"

const style = {
	group: css`
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	`,
	groupTitle: css`
		font-size: 1em;
		font-weight: 400;
		margin: 0;
		grid-column: r-side;
		color: var(--sub);
	`,
	post: css`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	`,
	postTitle: css`
		color: var(--fg);
	`,
	postMeta: css`
		color: var(--sub);
	`,
}

const Group = ({ group }: { group: File<PostData>[] }) => (
	<div {...style.group}>
		{group.map((file) => (
			<div {...style.post}>
				<a {...style.postTitle} href={file.path}>
					{file.data.title}
				</a>
				{file.data.date && (
					<time {...style.postMeta} datetime={file.data.date.toISOString()}>
						{format(file.data.date, "MMM d, yyyy")}
					</time>
				)}
			</div>
		))}
	</div>
)

interface PostData {
	title: string
	date?: Date
}

const getPosts = (glob: (pattern: string[]) => File[]) =>
	glob(["/log/**", "!/log/index.html"])
		.map((file) => {
			file.data.date = new Date(file.data.date ?? new Date())
			return file
		})
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

const Page = async ({ path, context: { generator, glob } }: PageProps) => {
	const posts = getPosts(glob)
	const grouped = group(posts, (post) => {
		if (post.data.date === undefined) {
			return ""
		}
		return post.data.date.getFullYear().toString()
	})

	return (
		<Html metadata={{ path, generator, title: "Log" }}>
			<Wrapper>
				{Object.entries(grouped)
					.sort(([a], [b]) => b.localeCompare(a))
					.map(([year, group]) => (
						<>
							<h2 {...style.groupTitle}>{year}</h2>
							<Group group={group} />
						</>
					))}
			</Wrapper>
		</Html>
	)
}

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
export { getPosts }
