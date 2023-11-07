import { defineCollection, z } from "astro:content"

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false),
    subtitle: z.string().optional(),
    font: z.string().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
}
