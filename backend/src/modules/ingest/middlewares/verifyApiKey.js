const  ApiError  = require("../../../utils/ApiError");

const verifyApiKey = (req, res, next) => {

    const apiKey = req.header("x-api-key");

    if (!apiKey) {
        return next(new ApiError(401, "Missing API Key"));
    }

    if (apiKey !== process.env.INGEST_API_KEY) {
        return next(new ApiError(403, "Invalid API Key"));
    }

    next();

};

module.exports = verifyApiKey;