const { z } = require("zod");

const addWatchlistSchema = z.object({
    contentItemId: z.string().min(1),
});

const updateWatchlistSchema = z.object({
    watched: z.boolean(),
});

module.exports = {
    addWatchlistSchema,
    updateWatchlistSchema,
};