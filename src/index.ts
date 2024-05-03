const labels = document.body.querySelectorAll(".side-label")
const sides = document.body.querySelectorAll(".side")

for (const [i, label] of labels.entries()) {
	const side = sides[i] as HTMLSpanElement
	label.addEventListener("click", () => {
		if (side.classList.contains("show")) {
			side.classList.remove("show")
		} else {
			side.classList.add("show")
		}
	})
}

const overlap = (a: HTMLElement, b: HTMLElement) => {
	const rectA = a.getBoundingClientRect()
	const rectB = b.getBoundingClientRect()

	return !(
		rectA.bottom < rectB.top ||
		rectA.top > rectB.bottom ||
		rectA.right < rectB.left ||
		rectA.left > rectB.right
	)
}

const reflow = () => {
	let adjust = 0

	for (let i = 1; i < sides.length; i++) {
		const a = sides[i - 1] as HTMLElement
		const b = sides[i] as HTMLElement

		for (; overlap(a, b) && adjust < 20; adjust++) {
			b.style.marginTop = `${adjust}rem`
		}
	}
}

const largeMql = window.matchMedia("(min-width: 40rem)")
if (largeMql.matches) {
	reflow()
}

let timeout: string | number | NodeJS.Timeout | undefined
window.addEventListener("resize", () => {
	clearTimeout(timeout)
	timeout = setTimeout(() => {
		if (largeMql.matches) {
			reset()
			reflow()
		}
	}, 200)
})

const reset = () => {
	for (const side of sides) {
		;(side as HTMLElement).style.marginTop = ""
	}
}

largeMql.addEventListener("change", (ev) => {
	if (ev.matches) {
		reflow()
	} else {
		reset()
	}
})
