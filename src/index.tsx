import type { JSX } from "soar/jsx-runtime"
import Html from "./_html.tsx"
import Wrapper from "./_wrapper.tsx"

const Page = ({ url, generator }: JSX.PageProps) =>
	(
		<Html
			metadata={{
				url,
				generator,
				title: "Lucas Yunkyu Lee",
			}}
		>
			<div class="wrapper">
				<Wrapper>
					<h1>Hi, I'm Lucas.</h1>
					<p>
						<span class="sub">I also go by</span> Yunkyu{" "}
						<span class="sub">or</span> yklcs
						<span class="sub">
							, and I'm studying computer science at POSTECH, Korea. I'm
							currently active duty military, serving under the KATUSA program,
							MOS 11B.
						</span>
					</p>
					<p>
						<span class="sub">My passion lies in the intersection between</span>{" "}
						research, development, and design
						<span class="sub">
							. I'm working on computer vision, programming languages,
							compilers, and more.
						</span>
					</p>
					<p>
						<span class="sub">Reach out to me at</span>{" "}
						<a href="mailto:lucas@yklcs.com">lucas@yklcs.com</a>,{" "}
						<span class="sub">read my blog at</span>{" "}
						<a href="/blog">yklcs.com/blog</a>,{" "}
						<span class="sub">and nitpick my code at</span>{" "}
						<a href="https:/github.com/yklcs">github.com/yklcs</a>.
					</p>
				</Wrapper>
				<Wrapper>
					<h2>Projects</h2>
					<Projects />
				</Wrapper>
				<Wrapper>
					<h2>
						<a href="/blog" style="text-decoration: none;">
							Posts
						</a>
					</h2>
					<Posts />
				</Wrapper>
			</div>
		</Html>
	).styled(`
    h1,
    h2 {
      margin: 0;
      grid-column: r-side;
      font-size: 1em;
      font-weight: 400;
    }

    h2 {
      color: var(--sub);
    }

    .sub {
      color: var(--sub);
    }

    div.wrapper {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    p {
      margin: 0;
			hyphens: none;
    }
  `)

const Link = ({
	title,
	href,
	display,
}: {
	title: string
	href: string
	display: string
}) =>
	(
		<div>
			<span>{title}</span>
			<a href={href}>{display}</a>
		</div>
	).styled`
  div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1ch;
  }

  a {
    color: var(--sub);  
  }
`

const Projects = () => {
	const Project = ({
		name,
		href,
		desc,
	}: {
		name: string
		href: string
		desc: string
	}) =>
		(
			<div>
				<a href={href}>{name}</a>
				<p>{desc}</p>
			</div>
		).styled(`
    a {
      text-decoration: none;
    }
  
    p {
      margin: 0;
      color: var(--sub);
    }
  `)

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
		<div>
			{projects.map((project) => (
				<Project name={project[0]} href={project[1]} desc={project[2]} />
			))}
		</div>
	).styled`
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`
}

const Posts = async () => {
	const { posts } = await import("./blog/index.tsx")

	const Post = ({ title, href }: { title: string; href: string }) =>
		(<a href={href}>{title}</a>).styled`
    a {
    }
  `

	return (
		<div>
			{posts.map((post) => (
				<Post title={post.title} href={post.url} />
			))}
		</div>
	).styled`
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  `
}

export default Page
