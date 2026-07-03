const commonSchemas = require("./schemas/common.schema");
const authSchemas = require("./schemas/auth.schema");
const commonResponses = require("./responses/common.response");
const authPaths = require("./paths/auth.path");
const bearerSecurity = require("./security/bearer.security");
const tags = require("./tags/tags");
const parameters = require("./parameters/common.parameters");
const apiResponseSchemas = require("./schemas/api-response.schema");


module.exports = {

    schemas: {

        ...commonSchemas,

        ...apiResponseSchemas,

        ...authSchemas,

    },

    responses: {
        ...commonResponses,
    },

    parameters,

    securitySchemes: {
        ...bearerSecurity,
    },

    tags,

    paths: {
        ...authPaths,
    },

};