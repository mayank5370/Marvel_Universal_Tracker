const commonSchemas = require("./schemas/common.schema");
const authSchemas = require("./schemas/auth.schema");

const commonResponses = require("./responses/common.response");

const authPaths = require("./paths/auth.path");

module.exports = {

    schemas: {
        ...commonSchemas,
        ...authSchemas,
    },

    responses: {
        ...commonResponses,
    },

    paths: {
        ...authPaths,
    },

};