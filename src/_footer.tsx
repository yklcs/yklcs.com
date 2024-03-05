import { exec as exec_ } from "node:child_process"
import { promisify } from "node:util"
import { format } from "date-fns"

const exec = promisify(exec_)

const Footer = async () =>
	(
		<footer>
			<div>
				<div>
					<a href="/">Home</a>
					<a href="/blog">Blog</a>
				</div>
				<a href="/colophon">Colophon</a>
			</div>
			<div>
				<a class="commit" href="https://github.com/yklcs/yklcs.com">
					{(await exec("git rev-parse HEAD")).stdout.substring(0, 7)}
				</a>
				<span>+</span>
				<a href="https://github.com/yklcs/soar">
					Soar {(await exec("pnpm info soar version")).stdout}
				</a>
			</div>
		</footer>
	).styled`
  footer {
    border-top: 1px solid;
    border-color: var(--subsub);
    padding: 1rem 0; 
    font-size: 0.85em;
    color: var(--sub);
    grid-column: wide;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1ch;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 1ch;
    justify-content: flex-start;
  }

  a {
    text-decoration: none;
  }

  .commit {
    font-family: var(--mono);
  }
`

export default Footer
