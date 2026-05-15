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
	italic: css`
		font-style: italic;
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
		gap: 1.125rem;
	`,
	small: css`
		font-size: 0.875em;
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
					My interests include programming languages and 3D computer vision. I'm
					currently undergoing a research internship on floating-point
					computations at the{" "}
					<a {...style.link} href="https://sites.google.com/view/fpc-lab/home">
						POSTECH Foundations of Programming & Computing Lab
					</a>
					.
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
					<a {...style.link} href="https://github.com/yklcs">
						github.com/yklcs
					</a>
					.
				</p>
			</Wrapper>
			<Wrapper>
				<h2 {...style.sectionTitle}>Publications</h2>
				<Publications />
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

const Publications = () => {
	const Publication = ({
		title,
		href,
		authors,
		appeared,
	}: {
		title: string
		href: string
		authors: string
		appeared: string
	}) => {
		const [before, after] = authors.split("Lucas Yunkyu Lee")

		return (
			<div
				{...css`
					text-wrap: pretty;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 0.1rem;
				`}
			>
				<a {...style.link} href={href}>
					{title}
				</a>
				<p {...css(style.p, style.sub)}>
					{before}
					<span
						{...css`
							text-decoration: underline;
						`}
					>
						Lucas Yunkyu Lee
					</span>
					{after}
				</p>
				<p {...css(style.p, style.italic)}>{appeared}</p>
			</div>
		)
	}

	const publications = [
		[
			"FreeTimeGS++: Secrets of Dynamic Gaussian Splatting and Their Principles",
			"https://arxiv.org/abs/2605.03337",
			"Lucas Yunkyu Lee*, Soonho Kim*, Youngwook Kim, Sangmin Kim, Jaesik Park",
			"arXiv Preprint (2026)",
		],
		[
			"TRiGS: Temporal Rigid-body Motion for Scalable 4D Gaussian Splatting",
			"https://wwwjjn.github.io/TRiGS-project_page/",
			"Suwoong Yeom*, Joonsik Nam*, Seunggyu Choi*, Lucas Yunkyu Lee, Sangmin Kim, Jaesik Park, Joonsoo Kim, Kugjin Yun, Kyeongbo Kong, Sukju Kang",
			"arXiv Preprint (2026)",
		],
		[
			"Optimized Minimal 4D Gaussian Splatting",
			"https://minshirley.github.io/OMG4/",
			"Minseo Lee*, Byeonghyeon Lee*, Lucas Yunkyu Lee, Eunsoo Lee, Sangmin Kim, Seunghyeon Song, Joo Chan Lee, Jong Hwan Ko, Jaesik Park, Eunbyung Park",
			"arXiv Preprint (2025)",
		],
	]

	return (
		<div {...style.list}>
			{publications.map((project) => (
				<Publication
					title={project[0]}
					href={project[1]}
					authors={project[2]}
					appeared={project[3]}
				/>
			))}
		</div>
	)
}

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
			"jaxsplat",
			"https://github.com/yklcs/jaxsplat",
			"CUDA accelerated 3D Gaussian Splatting differentiable renderer for JAX",
		],
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
