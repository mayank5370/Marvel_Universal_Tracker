module.exports = {

    ErrorResponse: {

        type: "object",

        properties: {

            success: {
                type: "boolean",
                example: false,
            },

            statusCode: {
                type: "integer",
                example: 404,
            },

            message: {
                type: "string",
                example: "Resource not found",
            },

        },

    },

    ValidationErrorResponse: {

        type: "object",

        properties: {

            success: {
                type: "boolean",
                example: false,
            },

            statusCode: {
                type: "integer",
                example: 400,
            },

            message: {
                type: "string",
                example: "Validation failed",
            },

            errors: {

                type: "array",

                items: {

                    type: "object",

                    properties: {

                        field: {
                            type: "string",
                            example: "email",
                        },

                        message: {
                            type: "string",
                            example: "Invalid email address",
                        },

                    },

                },

            },

        },

    },

};