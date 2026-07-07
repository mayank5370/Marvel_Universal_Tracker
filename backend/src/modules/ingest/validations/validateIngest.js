const ApiError = require("../../../utils/ApiError");

const validateIngest = (req, res, next) => {

    const payload = req.body;

    if (!payload) {
        return next(new ApiError(400, "Request body is required."));
    }

    const item = Array.isArray(payload) ? payload[0] : payload;

    const requiredFields = [
        "title",
        "slug",
        "sourceUrl",
        "publishedAt",
        "contentType",
        "sourceName",
        "ai"
    ];

    for (const field of requiredFields) {
        if (!item[field]) {
            return next(
                new ApiError(
                    400,
                    `Missing required field: ${field}`
                )
            );
        }
    }

    if (!item.ai.tldr) {
        return next(new ApiError(400, "Missing ai.tldr"));
    }

    if (item.ai.importanceScore === undefined) {
        return next(new ApiError(400, "Missing ai.importanceScore"));
    }

    if (!item.ai.spoilerRisk) {
        return next(new ApiError(400, "Missing ai.spoilerRisk"));
    }

    next();
};

module.exports = validateIngest;