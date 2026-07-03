const { z } = require("zod");

const cuidSchema = z.object({
    id: z.string().cuid(),
});

module.exports = {
    cuidSchema,
};

const paginationSchema = z.object({

    page: z.coerce.number()
        .min(1)
        .default(1),

    limit: z.coerce.number()
        .min(1)
        .max(100)
        .default(10),

});