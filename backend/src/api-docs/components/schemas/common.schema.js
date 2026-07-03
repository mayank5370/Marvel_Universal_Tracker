const commonSchemas = {

    ErrorResponse: {

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

        },

    },

    ValidationError: {

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

};
module.exports = commonSchemas;