const { z } = require("zod");

const createContentSchema = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    content: z.string().min(1),

    thumbnailUrl: z.string().url(),

    sourceUrl: z.string().url(),

    sourceName: z.string().min(1),

    publishedAt: z.string(),

    contentType: z.enum([
        "MOVIE",
        "SERIES",
        "COMIC",
        "GAME",
        "OTHER",
    ]),

    ai: z.object({
        tldr: z.string(),

        importanceScore: z.number().min(1).max(10),

        spoilerRisk: z.enum([
            "LOW",
            "MEDIUM",
            "HIGH",
        ]),

        tags: z.array(z.string()),

        entities: z.array(z.string()),
    }),
});

module.exports = {
    createContentSchema,
};