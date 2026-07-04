const successResponse = (
    schemaName,
    description = "Request completed successfully"
) => ({
    description,

    content: {
        "application/json": {
            schema: {
                allOf: [
                    {
                        $ref: "#/components/schemas/ApiResponse",
                    },
                    {
                        type: "object",
                        properties: {
                            data: {
                                $ref: `#/components/schemas/${schemaName}`,
                            },
                        },
                    },
                ],
            },

            example: {
                success: true,
                statusCode: 200,
                message: description,
            },
        },
    },
});

const createdResponse = (
    schemaName,
    description = "Resource created successfully"
) => ({
    description,

    content: {
        "application/json": {
            schema: {
                allOf: [
                    {
                        $ref: "#/components/schemas/ApiResponse",
                    },
                    {
                        type: "object",
                        properties: {
                            data: {
                                $ref: `#/components/schemas/${schemaName}`,
                            },
                        },
                    },
                ],
            },

            example: {
                success: true,
                statusCode: 201,
                message: description,
            },
        },
    },
});

const arrayResponse = (
    schemaName,
    description = "Request completed successfully"
) => ({
    description,

    content: {
        "application/json": {
            schema: {
                allOf: [
                    {
                        $ref: "#/components/schemas/ApiResponse",
                    },
                    {
                        type: "object",
                        properties: {
                            data: {
                                type: "array",
                                items: {
                                    $ref: `#/components/schemas/${schemaName}`,
                                },
                            },
                        },
                    },
                ],
            },

            example: {
                success: true,
                statusCode: 200,
                message: description,
            },
        },
    },
});

const paginatedResponse = (
    schemaName,
    description = "Request completed successfully"
) => ({
    description,

    content: {
        "application/json": {
            schema: {
                allOf: [
                    {
                        $ref: "#/components/schemas/PaginatedResponse",
                    },
                    {
                        type: "object",
                        properties: {
                            data: {
                                type: "array",
                                items: {
                                    $ref: `#/components/schemas/${schemaName}`,
                                },
                            },
                        },
                    },
                ],
            },

            example: {
                success: true,
                statusCode: 200,
                message: description,
            },
        },
    },
});

module.exports = {
    successResponse,
    createdResponse,
    arrayResponse,
    paginatedResponse,
};