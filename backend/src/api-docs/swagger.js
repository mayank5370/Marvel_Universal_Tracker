const {
    schemas,
    responses,
    parameters,
    securitySchemes,
    tags,
    paths,
} = require("./index");

module.exports = {
    openapi: "3.0.3",

    info: {
        title: "MarvelVerse API",
        version: "1.0.0",
        description: "AI Powered Marvel Universe Tracker",
        contact: {
            name: "Mayank Singh Rai",
        },
    },

    servers: [
        {
            url: "http://localhost:8000/api",
            description: "Development Server",
        },
    ],

    tags,

    components: {

        securitySchemes,

        schemas,

        responses,

        parameters,

    },

    security: [
        {
            bearerAuth: [],
        },
    ],

    paths,
};