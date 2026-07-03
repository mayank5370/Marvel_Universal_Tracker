module.exports = {

    "/auth/register": {

        post: {

            tags: ["Authentication"],

            summary: "Register a new user",

            description:
                "Creates a new MarvelVerse account.",

            requestBody: {

                required: true,

                content: {

                    "application/json": {

                        schema: {

                            $ref: "#/components/schemas/RegisterRequest",

                        },

                    },

                },

            },

            responses: {

                201: {
                    description:
                        "User registered successfully",
                },

                400: {
                    description:
                        "Validation failed",
                },

            },

        },

    },

    "/auth/login": {

        post: {

            tags: ["Authentication"],

            summary: "Login",

            requestBody: {

                required: true,

                content: {

                    "application/json": {

                        schema: {

                            $ref: "#/components/schemas/LoginRequest",

                        },

                    },

                },

            },

            responses: {

                200: {

                    description:
                        "Login successful",

                },

            },

        },

    },

};