import { exec as exec_ } from "node:child_process"
import { promisify } from "node:util"
import { css } from "soar"

const exec = promisify(exec_)

const style = {
	footer: css`
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

		@media print {
			display: none;
		}
	`,
	link: css`
		color: var(--sub);
	`,
	mono: css`
		font-family: var(--mono);
	`,
	div: (gap: number) => css`
		display: flex;
		flex-direction: row;
		gap: ${gap}ch;
		justify-content: flex-start;
		align-items: baseline;
	`,
}

const Footer = async () => (
	<footer {...style.footer}>
		<div {...style.div(1)}>
			<a href="/" {...style.link}>
				Home
			</a>
			<a href="/log" {...style.link}>
				Log
			</a>
			<a href="/colophon" {...style.link}>
				Colophon
			</a>
		</div>
		<div {...style.div(0.5)}>
			<a
				href="https://github.com/yklcs/yklcs.com"
				{...css(style.link, style.mono)}
			>
				{(await exec("git rev-parse HEAD")).stdout.substring(0, 7)}
			</a>
			<span>+</span>
			<a href="https://github.com/yklcs/soar" {...style.link}>
				Soar {(await exec("pnpm info soar version")).stdout}
			</a>
		</div>
	</footer>
)

export default Footer
