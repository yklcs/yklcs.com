<div align="center">

# [luc.li](https://luc.li)

![luc.li screenshot](src/images/luc.li-screenshot.png)

Website of Lucas Yunkyu Lee. Powered by [Gatsby](http://gatsbyjs.com), hand-crafted with ❤️.

[![CI Status](https://github.com/rocketll/luc.li/workflows/Build%20CI/badge.svg)](https://github.com/RocketLL/luc.li/actions/workflows/build.yml)
[![CI Status](https://github.com/rocketll/luc.li/workflows/AWS%20CD/badge.svg)](https://github.com/RocketLL/luc.li/actions/workflows/deploy.yml)

</div>

---

## Technology Stack

### Frontend

- React with Gatsby SSG
- CSS-in-JS via styled-components

### Backend

- Hosted on AWS S3
- Served by AWS CloudFront
- Headers and redirection by AWS Lambda@Edge

### Tooling

- CI/CD with GitHub Actions
- Formatted and linted automatically via lint-staged
- Formatted with prettier
- Linted with eslint and stylelint

## Notes

- Developed on macOS (M1 with Rosetta 2 x64)
- Uses calendar versioning as it is more suitable than semantic versioning for a blog
