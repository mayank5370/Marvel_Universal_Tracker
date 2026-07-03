module.exports = {

    Content: {

        type: "object",

        properties: {

            id: {
                type: "string",
                example: "cmqv7392n0002uex0ao8d46cp",
            },

            title: {
                type: "string",
            },

            slug: {
                type: "string",
            },

            summary: {
                type: "string",
            },

            contentType: {

                type: "string",

                enum: [
                    "MOVIE",
                    "SERIES",
                    "COMIC",
                    "GAME",
                    "OTHER",
                ],

            },

            publishedAt: {
                type: "string",
                format: "date-time",
            },

        },

    },

};