import { css, File, type PageProps } from "soar"
import Html from "./_html.tsx"
import Wrapper from "./_wrapper.tsx"
import { getPosts } from "./log.tsx"

const style = {
	name: css`
		grid-column: r-side;
		font-size: 1em;
		font-weight: 400;
		margin: 0 0 0.5rem 0;
	`,
	sectionTitle: css`
		margin: 0;
		grid-column: r-side;
		font-size: 1em;
		font-weight: 400;
		color: var(--sub);
	`,
	sub: css`
		color: var(--sub);
	`,
	p: css`
		margin: 0;
		hyphens: none;
	`,
	wrapper: css`
		display: flex;
		flex-direction: column;
		gap: 3rem;
	`,
	link: css`
		color: var(--fg);
	`,
	list: css`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	`,
}

const Page = ({ path, context: { generator, glob } }: PageProps) => (
	<Html
		metadata={{
			path,
			generator,
			title: "Lucas Yunkyu Lee",
		}}
	>
		<div {...style.wrapper}>
			<Wrapper>
				<h1 {...style.name}>Lucas Yunkyu Lee</h1>
				<p {...style.p}>
					I'm studying computer science at POSTECH, Korea. My passion lies in
					the intersection between research, development, and design.
				</p>
				<p {...css(style.p, style.sub)}>
					My interests include machine learning, computer vision, programming
					languages, and compilers. I'm currently undergoing a research
					internship on scene representation at the SNU Visual & Geometric
					Intelligence Lab.
				</p>
				<p {...css(style.p, style.sub)}>
					Reach out to me at{" "}
					<a {...style.link} href="mailto:lucas@yklcs.com">
						lucas@yklcs.com
					</a>
					, read my blog at{" "}
					<a {...style.link} href="/log">
						yklcs.com/log
					</a>
					, and nitpick my code at{" "}
					<a {...style.link} href="https:/github.com/yklcs">
						github.com/yklcs
					</a>
					.
				</p>
			</Wrapper>
			<Wrapper>
				<h2 {...style.sectionTitle}>Projects</h2>
				<Projects />
			</Wrapper>
			<Wrapper>
				<h2 {...style.sectionTitle}>
					<a {...style.sub} href="/log">
						Log
					</a>
				</h2>
				<Posts glob={glob} />
			</Wrapper>
		</div>
	</Html>
)

const Link = ({
	title,
	href,
	display,
}: {
	title: string
	href: string
	display: string
}) => (
	<div>
		<span>{title}</span>
		<a href={href}>{display}</a>
	</div>
)

const Projects = () => {
	const Project = ({
		name,
		href,
		desc,
	}: {
		name: string
		href: string
		desc: string
	}) => (
		<div>
			<a {...style.link} href={href}>
				{name}
			</a>
			<p {...css(style.p, style.sub)}>{desc}</p>
		</div>
	)

	const projects = [
		[
			"Soar",
			"https://github.com/yklcs/soar",
			"JSX based static site generator",
		],
		[
			"chocc",
			"https://github.com/yklcs/chocc",
			"ANSI C compiler in ANSI C targeting WebAssembly",
		],
		[
			"lisp-roots",
			"https://github.com/yklcs/lisp-roots",
			"The roots of Lisp à la John McCarthy",
		],
	]

	return (
		<div {...style.list}>
			{projects.map((project) => (
				<Project name={project[0]} href={project[1]} desc={project[2]} />
			))}
		</div>
	)
}

const Posts = async ({ glob }: { glob: (patterns: string[]) => File[] }) => {
	const posts = getPosts(glob)

	return (
		<div {...style.list}>
			{posts.map((post) => (
				<a {...style.link} href={post.path}>
					{post.data.title}
				</a>
			))}
		</div>
	)
}

export default Page
