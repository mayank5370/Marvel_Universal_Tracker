// const globalErrorHandler = (
//     err,
//     req,
//     res,
//     next

// ) => {
//     const statusCode = err.statusCode || 500;
//     return res.status(statusCode).json({
//         success: false,
//         message: err.message || "Internal Server Error",
//     }); 
// };

// module.exports = globalErrorHandler;

const globalErrorHandler = (err, req, res, next) => {
    console.error("========== ERROR ==========");
    console.error(err);
    console.error(err.stack);
    console.error("===========================");

    res.status(500).json({
        success: false,
        message: err.message,
    });
};

module.exports = globalErrorHandler;