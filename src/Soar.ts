import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import remarkDirective from "remark-directive"
import { visit, SKIP } from "unist-util-visit"
import type { SoarConfig } from "soar"
import type { TextDirective } from "mdast-util-directive"
import type { Root as MDRoot } from "mdast"
import type { Root as HRoot } from "hast"

const rehypeSidenotes = () => (tree: HRoot) => {
	visit(tree, "element", (node, idx, parent) => {})
}

declare module "mdast" {
	interface ParagraphData {
		side?: boolean
	}
}

const remarkSidenotes = () => (tree: MDRoot) => {
	visit(tree, (node) => {
		const sides: TextDirective[] = []
		visit(node, "textDirective", (child, i, parent) => {
			if (child.name === "side" && i) {
				parent?.children.splice(i, 0, {
					type: "text",
					value: `${sides.length + 1}`,
					data: {
						hName: "button",
						hProperties: {
							id: `side-label-${sides.length}`,
							class: "side-label",
						},
					},
				})
				sides.push(child)
				return [SKIP, i + 2]
			}
		})

		for (const [idx, side] of sides.entries()) {
			side.name = "__side"
			side.children.splice(0, 0, {
				type: "text",
				value: `${idx + 1} `,
				data: {
					hName: "span",
					hProperties: { class: "side-index" },
				},
			})
			side.data = {
				hName: "small",
				hProperties: { class: "side", id: `side-${idx}` },
			}
		}
	})
}

const config: SoarConfig = {
	rehypePlugins: [rehypeKatex, rehypeSidenotes],
	remarkPlugins: [remarkMath, remarkDirective, remarkSidenotes],
}

export default config
