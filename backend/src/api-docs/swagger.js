const {
    schemas,
    responses,
    parameters,
    securitySchemes,
    tags,
    paths,
} = require("./index");

const swaggerSpec = {
    openapi: "3.0.3",

    info: {
        title: "MarvelVerse API",
        version: "1.0.0",
        description: "AI Powered Marvel Universe Tracker",
        contact: {
            name: "Mayank Singh",
            url: "https://github.com/mayank5370",
            email: "mayankp5370@gmail.com",
        },
        license: {
            name: "MIT",
        },
    },

    externalDocs: {
        description: "MarvelVerse Documentation",
        url: "https://github.com/mayank5370/Marvel_Universal_Tracker",
    },

    logo: {
        url: "...",
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

module.exports = Object.freeze(swaggerSpec);