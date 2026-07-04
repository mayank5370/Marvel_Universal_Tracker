module.exports = {

    "/auth/register": {

        post: {

            operationId: "registerUser",

            tags: ["Authentication"],

            summary: "Register a new user",

            description:
                "Creates a new MarvelVerse user account.",

            security: [],

            requestBody: {

                required: true,

                content: {

                    "application/json": {

                        schema: {
                            $ref: "#/components/schemas/RegisterRequest",
                        },

                        examples: {

                            register: {
                                $ref: "#/components/examples/RegisterRequestExample",
                            },

                        },

                    },

                },

            },

            responses: {

                201: {

                    description: "User registered successfully",

                },

                400: {

                    $ref: "#/components/responses/BadRequest",

                },

                409: {

                    $ref: "#/components/responses/Conflict",

                },

            },

        },

    },

    "/auth/login": {

        post: {

            operationId: "loginUser",

            tags: ["Authentication"],

            summary: "Login user",

            description:
                "Authenticates a user and returns JWT tokens.",

            security: [],

            requestBody: {

                required: true,

                content: {

                    "application/json": {

                        schema: {

                            $ref: "#/components/schemas/LoginRequest",

                        },

                        examples: {

                            login: {

                                $ref: "#/components/examples/LoginRequestExample",

                            },

                        },

                    },

                },

            },

            responses: {

                200: {

                    description: "Login successful",

                },

                400: {

                    $ref: "#/components/responses/BadRequest",

                },

                401: {

                    $ref: "#/components/responses/Unauthorized",

                },

            },

        },

    },

    "/auth/me": {

        get: {

            operationId: "getCurrentUser",

            tags: ["Authentication"],

            summary: "Get current user profile",

            description:
                "Returns the authenticated user's profile.",

            security: [

                {

                    bearerAuth: [],

                },

            ],

            responses: {

                200: {

                    description:
                        "Profile fetched successfully",

                },

                401: {

                    $ref: "#/components/responses/Unauthorized",

                },

            },

        },

    },

};