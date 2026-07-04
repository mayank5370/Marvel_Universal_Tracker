const requestBody = (
    schema,
    example,
    required = true
) => ({
    required,

    content: {
        "application/json": {
            schema: {
                $ref: `#/components/schemas/${schema}`,
            },

            examples: {
                default: {
                    $ref: `#/components/examples/${example}`,
                },
            },
        },
    },
});

module.exports = {
    requestBody,
};