import { exec as exec_ } from "node:child_process"
import { promisify } from "node:util"

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
			<div style="gap: 0.5ch;">
				<a class="mono" href="https://github.com/yklcs/yklcs.com">
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
    align-items: baseline;
  }

  a {
    color: var(--sub);
  }

  .mono {
    font-family: var(--mono);
  }
`

export default Footer
