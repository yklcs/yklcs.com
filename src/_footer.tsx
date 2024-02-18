import { format } from "date-fns"

const Footer = () =>
	(
		<footer>
			<div>
				<a href="/">Home</a>
				<a href="/blog">Blog</a>
			</div>
			<span>Made in Korea</span>
		</footer>
	).styled`
  footer {
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
`

export default Footer
