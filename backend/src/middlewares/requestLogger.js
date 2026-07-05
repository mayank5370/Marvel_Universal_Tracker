const pinoHttp = require("pino-http");
const logger = require("../logger/logger");

const requestLogger = pinoHttp({
    logger,

    customProps(req) {
        return {
            requestId: req.requestId,
        };
    },

    customLogLevel(req, res, err) {
        if (err || res.statusCode >= 500) {
            return "error";
        }

        if (res.statusCode >= 400) {
            return "warn";
        }

        return "info";
    },

    customSuccessMessage(req) {
        return `${req.method} ${req.originalUrl} completed`;
    },

    customErrorMessage(req, res) {
        return `${req.method} ${req.originalUrl} failed`;
    },

    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
                ip: req.ip,
            };
        },

        res(res) {
            return {
                statusCode: res.statusCode,
            };
        },
    },
});

module.exports = requestLogger;