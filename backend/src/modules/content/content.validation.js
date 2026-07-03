const { z } = require("zod");
const { CONTENT_TYPE, SPOILER_RISK, } = require("../../utils/constants");

const createContentSchema = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    content: z.string().min(1),

    thumbnailUrl: z.string().url(),

    sourceUrl: z.string().url(),

    sourceName: z.string().min(1),

    publishedAt: z.string(),

    contentType: z.enum(
        Object.values(CONTENT_TYPE)
    ),

    ai: z.object({
        tldr: z.string(),

        importanceScore: z.number().min(1).max(10),

        spoilerRisk: z.enum(
            Object.values(SPOILER_RISK)
        ),

        tags: z.array(z.string()),

        entities: z.array(z.string()),
    }),
});

const searchContentSchema = z.object({

    q: z.string().optional(),

    type: z
        .enum(Object.values(CONTENT_TYPE))
        .optional(),

    spoilerRisk: z
        .enum(Object.values(SPOILER_RISK))
        .optional(),

    sort: z
        .enum([
            "latest",
            "importance",
        ])
        .optional(),

});


module.exports = {
    createContentSchema,
    searchContentSchema,
};