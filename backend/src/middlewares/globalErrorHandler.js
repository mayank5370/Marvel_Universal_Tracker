const { ZodError } = require("zod");


const globalErrorHandler = (err, req, res, next) => {

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: err.issues[0].message,
        });
    }

    const statusCode = err.statusCode || 500;

    const response = {
        success: false,
        statusCode,
        message: err.message || "Internal Server Error",
    };

    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res.status(statusCode).json(response);
};

module.exports = globalErrorHandler;