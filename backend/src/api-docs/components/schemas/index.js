const commonSchemas = require("./common.schema");
const apiResponseSchemas = require("./api-response.schema");
const authSchemas = require("./auth.schema");
const contentSchemas = require("./content.schema");
const errorSchemas = require("./error.schema");

module.exports = {

    ...commonSchemas,

    ...apiResponseSchemas,

    ...errorSchemas,

    ...authSchemas,

    ...contentSchemas,

};