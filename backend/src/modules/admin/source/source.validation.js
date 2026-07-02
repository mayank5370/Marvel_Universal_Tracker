const { z } = require("zod");

const createSourceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Source name must be at least 2 characters"),

    baseUrl: z
        .string()
        .trim()
        .url("Invalid URL format"),
});

const updateSourceSchema = createSourceSchema;

module.exports = {
    createSourceSchema,
    updateSourceSchema,
};