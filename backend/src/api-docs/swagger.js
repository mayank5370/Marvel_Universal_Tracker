const { schemas, responses, paths, } = require("./index");


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

    tags: [
        {
            name: "Authentication",
            description: "Authentication APIs",
        },
        {
            name: "Dashboard",
            description: "Dashboard APIs",
        },
        {
            name: "Sources",
            description: "RSS Source Management",
        },
        {
            name: "Content",
            description: "Marvel Content APIs",
        },
        {
            name: "Moderation",
            description: "Content Moderation",
        },
        {
            name: "Watchlist",
            description: "User Watchlist",
        },
    ],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },

        schemas,
    },

    security: [
        {
            bearerAuth: [],
        },
    ],

    paths,
};