<div align="center">

# [yklcs.com](https://yklcs.com)

Source for <https://yklcs.com>

[![Build and Deploy](https://github.com/yklcs/yklcs.com/actions/workflows/build_and_deploy.yml/badge.svg)](https://github.com/yklcs/yklcs.com/actions/workflows/build_and_deploy.yml)
[![Lint](https://github.com/yklcs/yklcs.com/actions/workflows/lint.yml/badge.svg)](https://github.com/yklcs/yklcs.com/actions/workflows/lint.yml)

</div>

---

## Tech Stack

### Frontend

- [Soar](https://github.com/yklcs/soar) SSG

### CI/CD

1. Push to GitHub triggers webhook
2. AWS Lambda runs Soar to build page
3. Built page is uploaded to S3

### "Backend"

- Static files hosted on AWS S3
- AWS CloudFront CDN
- Headers and redirection by AWS CloudFront Functions
