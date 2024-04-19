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
					<h1>Lucas Yunkyu Lee</h1>
					<p>
						I'm studying computer science at POSTECH, Korea. My passion lies in
						the intersection between research, development, and design.
					</p>
					<p class="sub">
						I'm currently undergoing a research internship on scene
						representation at the SNU Visual & Geometric Intelligence Lab. My
						interests include machine learning, computer vision, programming
						languages, and compilers.
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
						<a href="/blog">Posts</a>
					</h2>
					<Posts />
				</Wrapper>
			</div>
		</Html>
	).styled`
    h1,
    h2 {
      margin: 0;
      grid-column: r-side;
      font-size: 1em;
      font-weight: 400;
    }

		h1 {
			margin: 0 0 0.5rem 0;
		}

    h2 {
      color: var(--sub);

      a {
        color: var(--sub);
      }
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

			a {
			  color: var(--fg);
			}
    }
  `

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
      color: var(--fg);
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
      color: var(--fg);
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
