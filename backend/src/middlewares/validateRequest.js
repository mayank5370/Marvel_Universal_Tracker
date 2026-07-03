const { ZodError } = require("zod");
const ApiError = require("../utils/ApiError");

const validateRequest = (schema) => {
    return (req, res, next) => {

        try {

            req.body = schema.parse(req.body);

            next();

        } catch (error) {

            if (error instanceof ZodError) {

                const errors = error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));

                return next(
                    new ApiError(
                        400,
                        "Validation failed",
                        errors
                    )
                );
            }

            next(error);
        }
    };
};

module.exports = validateRequest;