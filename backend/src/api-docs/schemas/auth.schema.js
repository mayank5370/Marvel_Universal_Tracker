const authSchemas = {

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
                example: "Peter Parker",
            },

            email: {
                type: "string",
                example: "peter@gmail.com",
            },

            password: {
                type: "string",
                example: "secret123",
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
                example: "peter@gmail.com",
            },

            password: {
                type: "string",
                example: "secret123",
            },

        },

    },

};

module.exports = authSchemas;