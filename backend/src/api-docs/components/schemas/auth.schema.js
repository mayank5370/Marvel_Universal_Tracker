module.exports = {

    RegisterRequest: {

        type: "object",

        required: [
            "name",
            "email",
            "password",
        ],

        properties: {

            name: {
                type: "string",
                example: "Tony Stark",
            },

            email: {
                type: "string",
                format: "email",
                example: "tony@starkindustries.com",
            },

            password: {
                type: "string",
                format: "password",
                example: "IronMan@123",
            },

        },

    },

    LoginRequest: {

        type: "object",

        required: [
            "email",
            "password",
        ],

        properties: {

            email: {
                type: "string",
                format: "email",
                example: "tony@starkindustries.com",
            },

            password: {
                type: "string",
                format: "password",
                example: "IronMan@123",
            },

        },

    },

    User: {

        type: "object",

        properties: {

            id: {
                type: "string",
                example: "cmr07fg9p0001uecofk7ibewe",
            },

            name: {
                type: "string",
                example: "Tony Stark",
            },

            email: {
                type: "string",
                example: "tony@starkindustries.com",
            },

            role: {
                type: "string",
                enum: [
                    "USER",
                    "ADMIN",
                ],
            },

        },

    },

    AuthTokens: {

        type: "object",

        properties: {

            accessToken: {
                type: "string",
            },

            refreshToken: {
                type: "string",
            },

        },

    },

};