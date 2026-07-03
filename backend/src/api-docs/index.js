const schemas = require("./components/schemas");
const responses = require("./components/responses");
const parameters = require("./components/parameters");
const securitySchemes = require("./components/security");
const tags = require("./tags/tags");
const paths = require("./paths");

module.exports = {
    schemas,
    responses,
    parameters,
    securitySchemes,
    tags,
    paths,
};