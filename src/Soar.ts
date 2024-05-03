import rehypeKatex from "rehype-katex"
import remarkFrontmatter from "remark-frontmatter"
import remarkMath from "remark-math"
import type { SoarConfig } from "soar"
import type { Root as MDRoot } from "mdast"
import yaml from "yaml"
import { visit, SKIP } from "unist-util-visit"
import { select, selectAll } from "unist-util-select"
import Markdown from "./_markdown.tsx"
import { gfmFootnoteFromMarkdown } from "mdast-util-gfm-footnote"
import { gfmFootnote } from "micromark-extension-gfm-footnote"

const remarkSidenotes = () => (tree: any) => {
	let idx = 0
	visit(tree, (ref, i, refParent) => {
		if (ref.type === "footnoteReference" && i) {
			ref.index = ++idx
			refParent?.children.splice(i, 1, {
				data: {
					hName: "label",
					hProperties: {
						id: `side-label-${ref.label}`,
						class: "side-label",
						"aria-describedby": `side-${ref.label}`,
					},
					hChildren: [{ type: "text", value: `${ref.index}` }],
				},
			})

			visit(tree, "footnoteDefinition", (def, j) => {
				if (def.identifier === ref.identifier && i && j) {
					refParent?.children.splice(i + 1, 0, {
						children: [
							{
								data: {
									hName: "span",
									hProperties: { class: "side-index" },
									hChildren: [{ type: "text", value: `${ref.index}` }],
								},
							},
							...def.children[0].children,
						],
						data: {
							hName: "small",
							hProperties: { class: "side", id: `side-${ref.label}` },
						},
					})
				}
			})

			return SKIP
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
		function () {
			const data = this.data()
			data.micromarkExtensions = data.micromarkExtensions ?? []
			data.fromMarkdownExtensions = data.fromMarkdownExtensions ?? []
			data.micromarkExtensions.push(gfmFootnote())
			data.fromMarkdownExtensions.push(gfmFootnoteFromMarkdown())
		},
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
