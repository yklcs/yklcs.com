function handler(event) {
	var response = event.response
	var headers = response.headers

	headers["strict-transport-security"] = {
		value: "max-age=63072000; includeSubdomains; preload",
	}
	headers["content-security-policy"] = {
		value:
			"default-src 'self'; img-src https: data:; media-src https: data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self' data:;",
	}
	headers["x-content-type-options"] = { value: "nosniff" }
	headers["x-frame-options"] = { value: "DENY" }
	headers["x-xss-protection"] = { value: "1; mode=block" }
	headers["cloudfront-functions"] = {
		value: "generated-by-CloudFront-Functions",
	}

	return response
}
