import { defineCollection, z } from 'astro:content';

const certificationCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        duration: z.string(),
        skills: z.array(
            z.object({
                title: z.string(),
                technologies: z.array(
                    z.object({
                        name: z.string()
                    })
                )
            })
        ),
        courses: z.array(
            z.object({
                name: z.string(),
                period: z.string().optional(),
                duration: z.string()
            })
        ),
        complementaryContent: z.array(
            z.object({
                name: z.string(),
                duration: z.string()
            })
        ).optional()
    })
});

const experienceCollection = defineCollection({
    type: 'data',
    schema: z.object({
        company: z.string(),
        position: z.string(),
        period: z.string(),
        description: z.string(),
        achievements: z.array(z.string()).optional()
    })
});

export const collections = {
    'certifications': certificationCollection,
    'experience': experienceCollection
};