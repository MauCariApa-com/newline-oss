import { defineCollection, z } from 'astro:content';

const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    meta_title: z.string().optional(),
    bio: z.string().optional(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    }).optional(),
  }),
});

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    updatedDate: z.date().optional(),
    authors: z.array(z.string()),
    editors: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    category: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  'authors': authorsCollection,
  'posts': postsCollection,
  'pages': pagesCollection,
};