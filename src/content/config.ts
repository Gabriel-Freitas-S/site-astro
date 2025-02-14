import { defineCollection, z } from 'astro:content';

const certificationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    duration: z.string(),
    courses: z.array(z.object({
      name: z.string(),
      period: z.string().optional(),
      duration: z.string()
    })),
    complementaryContent: z.array(z.object({
      name: z.string(),
      duration: z.string()
    })).optional()
  })
});

const experienceCollection = defineCollection({
  type: 'data',
  schema: z.object({
    company: z.string(),
    position: z.string(),
    period: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).optional(),
    achievements: z.array(z.string()).optional()
  })
});

export const collections = {
  certifications: certificationsCollection,
  experience: experienceCollection
};