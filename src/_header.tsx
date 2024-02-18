const Header = ({ url }: { url: string }) =>
	(
		<header>
			<a href="/" class="breadcrumb-home">
				⁂
			</a>
			{url
				.split("/")
				.filter((str) => str)
				.map((elm, idx, arr) => (
					<>
						{<span class="breadcrumb-separator">⁄</span>}
						<a
							href={`/${arr.slice(0, idx + 1).join("/")}`}
							class="breadcrumb-link"
						>
							{elm}
						</a>
					</>
				))}
		</header>
	).styled(`
  header {
    line-height: 1;
    grid-column: wide;
    display: flex;
    flex-direction: row;
    gap: 1ch;
  }

  .breadcrumb-separator, .breadcrumb-link {
    color: var(--sub);
  }

  a {
    text-decoration: none;
  }
`)

export default Header
