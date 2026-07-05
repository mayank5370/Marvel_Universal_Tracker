const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 3,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        statusCode: 429,
        message:
            "Too many authentication attempts. Please try again after 15 minutes.",
    },
});

// const authLimiter = rateLimit({
//     windowMs: 60 * 1000, // 1 minute
//     max: 2,

//     standardHeaders: true,
//     legacyHeaders: false,

//     handler: (req, res) => {
//         res.status(429).json({
//             success: false,
//             statusCode: 429,
//             message: "Too many authentication attempts.",
//         });
//     },
// });

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 300,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        statusCode: 429,
        message:
            "Too many requests. Please try again later.",
    },
});

const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 1000,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        statusCode: 429,
        message:
            "Too many admin requests.",
    },
});

module.exports = {
    authLimiter,
    apiLimiter,
    adminLimiter,
};