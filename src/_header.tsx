import { css } from "soar"

const style = {
	header: css`
		line-height: 1;
		grid-column: wide;
		display: flex;
		flex-direction: row;
		align-items: start;
		gap: 1ch;
		color: var(--sub);
	`,
	home: css`
		color: var(--fg);
	`,
	crumb: css`
		color: var(--sub);
	`,
}

const Header = ({ url }: { url: string }) => (
	<header {...style.header}>
		{url !== "/" && (
			<a href="/" {...style.home}>
				~yklcs
			</a>
		)}
		{url
			.split("/")
			.filter((str) => str)
			.map((elm, idx, arr) => (
				<>
					{<span>⁄</span>}
					<a href={`/${arr.slice(0, idx + 1).join("/")}`} {...style.crumb}>
						{elm}
					</a>
				</>
			))}
	</header>
)

export default Header
