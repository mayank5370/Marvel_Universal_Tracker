module.exports = {

    SuccessResponse: {
        description: "Request completed successfully",

        content: {
            "application/json": {
                schema: {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                },

                example: {
                    success: true,
                    statusCode: 200,
                    message: "Request completed successfully",
                    data: {},
                },
            },
        },
    },

    BadRequest: {
        description: "Validation failed",

        content: {
            "application/json": {
                schema: {
                    schema: {
                        $ref: "#/components/schemas/ValidationErrorResponse"
                    },
                },

                example: {
                    success: false,
                    statusCode: 400,
                    message: "Validation failed",
                },
            },
        },
    },

    Unauthorized: {
        description: "Authentication required",

        content: {
            "application/json": {
                schema: {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                },

                example: {
                    success: false,
                    statusCode: 401,
                    message: "Unauthorized",
                },
            },
        },
    },

    Forbidden: {
        description: "Access denied",

        content: {
            "application/json": {
                schema: {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                },

                example: {
                    success: false,
                    statusCode: 403,
                    message: "Forbidden",
                },
            },
        },
    },

    NotFound: {
        description: "Resource not found",

        content: {
            "application/json": {
                schema: {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                },

                example: {
                    success: false,
                    statusCode: 404,
                    message: "Resource not found",
                },
            },
        },
    },

    Conflict: {
        description: "Conflict",

        content: {
            "application/json": {
                schema: {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                },

                example: {
                    success: false,
                    statusCode: 409,
                    message: "Resource already exists",
                },
            },
        },
    },

    InternalServerError: {
        description: "Internal Server Error",

        content: {
            "application/json": {
                schema: {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                },

                example: {
                    success: false,
                    statusCode: 500,
                    message: "Internal Server Error",
                },
            },
        },
    },

};