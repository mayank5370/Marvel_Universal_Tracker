const badRequestResponse = () => ({
    $ref: "#/components/responses/BadRequest",
});

const unauthorizedResponse = () => ({
    $ref: "#/components/responses/Unauthorized",
});

const forbiddenResponse = () => ({
    $ref: "#/components/responses/Forbidden",
});

const notFoundResponse = () => ({
    $ref: "#/components/responses/NotFound",
});

const conflictResponse = () => ({
    $ref: "#/components/responses/Conflict",
});

const internalServerErrorResponse = () => ({
    $ref: "#/components/responses/InternalServerError",
});

module.exports = {
    badRequestResponse,
    unauthorizedResponse,
    forbiddenResponse,
    notFoundResponse,
    conflictResponse,
    internalServerErrorResponse,
};