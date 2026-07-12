const { z } = require("zod");

const subscribeSchema = z.object({
    endpoint: z
        .string()
        .trim()
        .url("Invalid subscription endpoint"),

    keys: z.object({
        p256dh: z
            .string()
            .trim()
            .min(1, "P256DH key is required"),

        auth: z
            .string()
            .trim()
            .min(1, "Auth key is required"),
    }),
});

const unsubscribeSchema = z.object({
    endpoint: z
        .string()
        .trim()
        .url("Invalid subscription endpoint"),
});

module.exports = {
    subscribeSchema,
    unsubscribeSchema,
};