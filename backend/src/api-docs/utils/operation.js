const createOperation = ({
    operationId,
    summary,
    description,
    tags,
    security = [],
    parameters = [],
    requestBody,
    responses,
}) => ({
    operationId,
    summary,
    description,
    tags,
    security,
    parameters,
    requestBody,
    responses,
});

module.exports = {
    createOperation,
};