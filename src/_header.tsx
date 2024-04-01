const Header = ({ url }: { url: string }) =>
	(
		<header>
			{url !== "/" && (
				<a href="/" class="breadcrumb-home">
					~
					{/* <svg
					viewBox="0 0 505 505"
					xmlns="http://www.w3.org/2000/svg"
					id="logo"
					height="1rem"
					role="img"
					aria-label="⁂"
				>
					<path d="M267.944 0L259.282 87.3536L345.901 62.4781L352.831 105.287L269.099 111.651L322.803 182.806L284.113 204.211L245.423 125.535L210.775 204.211L170.352 182.806L223.479 111.651L140.324 105.287L147.254 62.4781L233.296 87.3536L224.056 0H267.944ZM0 309.498L5.77465 267.267L92.9718 291.564L83.1549 204.789H127.042L117.803 291.564L204.423 267.267L211.93 309.498L127.62 316.44L181.901 387.595L142.634 409L104.521 330.324L69.8732 409L28.8732 387.595L82.5775 316.44L0 309.498ZM280.07 309.498L287.577 267.267L373.62 291.564L363.803 204.789H407.69L399.028 291.564L485.648 267.267L492 309.498L408.268 316.44L462.549 387.595L424.437 409L385.746 330.324L350.521 409L310.099 387.595L363.225 316.44L280.07 309.498Z" />
				</svg> */}
				</a>
			)}
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
	).styled`
  header {
    line-height: 1;
    grid-column: wide;
    display: flex;
    flex-direction: row;
		align-items: start;
    gap: 1ch;
  }

	#logo {
		fill: var(--fg);
		vertical-align: middle;
	}

  .breadcrumb-separator, .breadcrumb-link {
    color: var(--sub);
  }

  a {
    text-decoration: none;
  }
`

export default Header
