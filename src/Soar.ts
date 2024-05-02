import rehypeKatex from "rehype-katex"
import remarkFrontmatter from "remark-frontmatter"
import remarkMath from "remark-math"
import remarkDirective from "remark-directive"
import type { SoarConfig } from "soar"
import type { TextDirective } from "mdast-util-directive"
import type { Root as MDRoot } from "mdast"
import yaml from "yaml"
import { visit, SKIP } from "unist-util-visit"
import { select, selectAll } from "unist-util-select"
import Markdown from "./_markdown.tsx"

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
	remarkPlugins: [
		remarkFrontmatter,
		() => (tree, file) => {
			const frontmatter: any = select("yaml", tree)
			if (frontmatter !== undefined) {
				const parsed = yaml.parse(frontmatter.value)
				Object.assign(file.data, parsed)
			}

			const h1 = selectAll(`heading[depth="1"] text`, tree)
				.map((node: any) => node.value)
				.join("")

			file.data.title = h1
		},
		remarkMath,
		remarkDirective,
		remarkSidenotes,
	],
	rehypePlugins: [
		[
			rehypeKatex,
			{
				macros: {
					"\\vb": "\\mathbf{#1}",
					"\\R": "\\mathbb{R}",
				},
			},
		],
	],
	defaultMarkdownLayout: Markdown,
	ignore: ["_*.tsx"],
}

export default config
