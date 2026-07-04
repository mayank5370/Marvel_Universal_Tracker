const {
    successResponse,
    createdResponse,
} = require("../utils/responseFactory");

const {
    badRequestResponse,
    unauthorizedResponse,
    conflictResponse,
} = require("../utils/errorFactory");


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

                201: createdResponse(
                    "User",
                    "User registered successfully"
                ),

                400: badRequestResponse(),

                409: conflictResponse(),

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

                200: successResponse(
                    "AuthTokens",
                    "Login successful"
                ),

                400: badRequestResponse(),

                401: unauthorizedResponse(),

            }

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

                200: successResponse(
                    "User",
                    "Profile fetched successfully"
                ),

                401: unauthorizedResponse(),

            },

        },

    },

};