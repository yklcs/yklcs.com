#!/usr/bin/env bash

aws s3 cp public s3://luc.li --cache-control "no-cache" --recursive --exclude "*" --include "*.html" --include "page-data/**/*.json" --include "sw.js"
aws s3 cp public s3://luc.li --cache-control "public, max-age=31536000, immutable" --recursive --exclude "*" --include "static/**" --include "*.js" --include "*.css" --exclude "sw.js"
aws s3 sync public s3://luc.li --delete

aws cloudfront create-invalidation --distribution-id $AWS_CF_DIST_ID --paths "**/*.html" "page-data/**/*.json" "sw.js"