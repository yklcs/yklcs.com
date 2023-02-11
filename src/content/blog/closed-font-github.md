---
title: Closed fonts and Github
date: 2023-02-10
tags: [test]
---

## Level 2 heading

Line length is the distance between the left and right edges of a text block. Overly long lines are a common problem, but they’re easy to correct. Shorter lines will make a big difference in the legibility and professionalism of your layout.

The most useful way to measure line length is by average characters per line. Measuring in inches or centimeters is less useful because the point size of the font affects the number of characters per inch. Whereas characters per line works at any point size.

Shorter lines are more comfortable to read than longer lines. As line length increases, your eye has to travel farther from the end of one line to the beginning of the next, making it harder to track your progress vertically. Aim for an average line length of 45–90 characters, including spaces. You can check line length using word count.

abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz

## My solution

That brings me to my solution: downloading font files at build time from an S3 bucket.

```shell
$ aws s3 sync s3://luc.li-fonts public/fonts/closed
```

```json
{
  "pull-fonts": "aws s3 sync s3://luc.li-fonts public/fonts/closed"
}
```
