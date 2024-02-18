interface Metadata {
	title?: string
	type?: "article" | "website"
	url: string
	image?: string
	generator?: string
}

const hostname = "https://yklcs.com"

const stripTrailingSlash = (str: string) =>
	str.endsWith("/") ? str.slice(0, -1) : str

const Meta = (props: Metadata) => {
	const url: URL = new URL(props.url, hostname)
	const urlstr = stripTrailingSlash(url.href)

	return (
		<>
			<title>{props.title ?? "yklcs.com"}</title>
			<meta name="generator" content={props.generator ?? "Soar"} />
			<meta property="og:title" content={props.title ?? "yklcs.com"} />
			<meta property="og:type" content={props.type ?? "website"} />
			<meta property="og:url" content={urlstr} />
			<meta property="og:site_name" content={new URL(hostname).hostname} />
			<meta
				property="og:image"
				content={props.image ?? new URL("/og.png", hostname).href}
			/>
			<link rel="canonical" href={urlstr} />
		</>
	)
}

export default Meta
export type { Metadata }
