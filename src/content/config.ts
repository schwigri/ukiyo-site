import { defineCollection, reference, z } from 'astro:content';

const dataCollection = defineCollection({
	schema: z.object({
		posts: z.record(z.string(), z.object({
			lastModified: z.string(),
			published: z.string(),
		})),
	}),
	type: 'data',
});

const pagesCollection = defineCollection({
	schema: z.object({
		description: z.string(),
		order: z.number(),
		title: z.string(),
		translations: z.array(reference('pages')).optional(),
	}),
	type: 'content',
});

const postsCollection = defineCollection({
	schema: z.object({
		description: z.string(),
		title: z.string(),
		translations: z.array(reference('posts')).optional(),
	}),
});

export const collections = {
	data: dataCollection,
	pages: pagesCollection,
	posts: postsCollection,
};
