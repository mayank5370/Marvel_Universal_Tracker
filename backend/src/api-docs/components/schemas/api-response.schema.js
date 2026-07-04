module.exports = {

    ApiResponse: {

        type: "object",

        ApiResponse: {

            type: "object",

            properties: {

                success: {
                    type: "boolean",
                    example: true,
                },

                statusCode: {
                    type: "integer",
                    example: 200,
                },

                message: {
                    type: "string",
                    example: "Request completed successfully",
                },

            },

        },

    },

    PaginatedResponse: {

        type: "object",

        properties: {

            success: {
                type: "boolean",
                example: true,
            },

            statusCode: {
                type: "integer",
                example: 200,
            },

            message: {
                type: "string",
                example: "Content fetched successfully",
            },

            data: {
                type: "array",
                items: {
                    type: "object",
                },
            },

            pagination: {

                type: "object",

                properties: {

                    page: {
                        type: "integer",
                        example: 1,
                    },

                    limit: {
                        type: "integer",
                        example: 10,
                    },

                    total: {
                        type: "integer",
                        example: 150,
                    },

                    totalPages: {
                        type: "integer",
                        example: 15,
                    },

                },

            },

        },

    },

};