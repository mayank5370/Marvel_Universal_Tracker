const commonSchemas = require("./common.schema");
const apiResponseSchemas = require("./api-response.schema");
const authSchemas = require("./auth.schema");
const contentSchemas = require("./content.schema");

module.exports = {
    ...commonSchemas,
    ...apiResponseSchemas,
    ...authSchemas,
    ...contentSchemas,
};