async function handler(event) {
	const request = event.request
	const uri = request.uri

	if (uri == "/blog" || uri.startsWith("/blog/")) {
		// 301 /blog to /log
		const newUri = "/log" + request.uri.slice(5)
		return {
			statusCode: 302,
			statusDescription: "Found",
			headers: { location: { value: newUri } },
		}
	}

	if (uri.endsWith("/")) {
		// Handle index.html
		request.uri += "index.html"
	} else if (!uri.includes(".")) {
		request.uri += "/index.html"
	}

	return request
}
