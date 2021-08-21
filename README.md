<div align="center">

# [luc.li](https://luc.li)

Website of Lucas Yunkyu Lee. Powered by [Gatsby](http://gatsbyjs.com), hand-crafted with ❤️.

[![Build CI Status](https://github.com/rocketll/luc.li/workflows/Build%20CI/badge.svg)](https://github.com/RocketLL/luc.li/actions/workflows/build.yml)
[![Lint CI Status](https://github.com/rocketll/luc.li/workflows/Lint%20CI/badge.svg)](https://github.com/RocketLL/luc.li/actions/workflows/lint.yml)
[![AWS CD Status](https://github.com/rocketll/luc.li/workflows/AWS%20CD/badge.svg)](https://github.com/RocketLL/luc.li/actions/workflows/deploy.yml)

</div>

---

## Usage

### Production

```shell
# Build site with private fonts
npm run build

# Build site without private fonts
$ DISABLE_PRIVATE_FONTS=1 npm run build
```

Note: <https://luc.li> uses [closed source fonts](#typography).
These fonts are sourced from a private S3 bucket and are automatically copied into [src/fonts/private](/src/fonts/private) pre-build. Open source users can build with `DISABLE_PRIVATE_FONTS=1` to use fallback open source fonts.

### Development

```shell
# Develop mode (live reload)
npm run develop
```

## Technology Stack

### Frontend

- React with Gatsby SSG in TypeScript
- CSS-in-JS via styled-components

### Backend

- Hosted on AWS S3
- Served by AWS CloudFront
- Headers and redirection by AWS CloudFront Functions

### Tooling

- CI/CD with GitHub Actions
- Formatted and linted automatically via lint-staged
- Formatted with prettier
- Linted with eslint and stylelint
- Type checked with tsc

## Design

### Typography

[Suisse Int'l](https://www.swisstypefaces.com/fonts/suisse/) (closed) is used for sans-serif, [XCharter](https://ctan.org/pkg/xcharter?lang=en) (open) is used for serif, and [Iosevka](https://github.com/be5invis/Iosevka) (open) is used for monospace.

## Notes

- Developed on macOS (M1 arm64)
- Uses calendar versioning as it is more suitable than semantic versioning for a blog
