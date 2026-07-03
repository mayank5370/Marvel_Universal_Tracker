const { ZodError } = require("zod");
const ApiError = require("../utils/ApiError");

const validateRequest = (schemas) => {

    return (req, res, next) => {

        try {

            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }

            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }

            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }

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