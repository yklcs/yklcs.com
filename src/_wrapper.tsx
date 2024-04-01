import type { JSX } from "soar/jsx-runtime"
import { breakpoint } from "./_html.tsx"

interface WrapperProps {
	children: JSX.Children
	element?: JSX.ElementType
	style?: string
	class?: string
}

const Wrapper = ({
	children,
	element = "div",
	style,
	...props
}: WrapperProps) => {
	const Tag = element

	return (
		<Tag class={["wrapper", props.class]} style={style}>
			{children}
		</Tag>
	).styled(`
  .wrapper {
    display: grid;
    grid-template-columns:
      [full-start] 1fr
      [wide-start r-side-start l-main-start] minmax(0, 20ch)
      [r-side-end r-main-start] minmax(0, 25ch) [l-side-start l-main-end]
      minmax(0, 20ch) [r-main-end] minmax(0, 5ch) [l-side-end wide-end]
      1fr [full-end];
    gap: 1.25rem;
    margin: 0;

    @media screen and (max-width: ${breakpoint}) {
      gap: 1rem;
      grid-template-columns:
        [full-start] 0.25rem
        [wide-start r-main-start l-main-start r-side-start l-side-start l-side-wide-start] 1fr
        [r-main-end l-main-end r-side-end l-side-end l-side-wide-end wide-end]
        0.25rem [full-end];
    }
  }

  :where(.wrapper) > :global * {
    grid-column: r-main;
  }
`)
}

export default Wrapper
