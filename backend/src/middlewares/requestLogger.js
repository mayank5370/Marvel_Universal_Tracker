const pinoHttp = require("pino-http");
const logger = require("../logger/logger");

const requestLogger = pinoHttp({
    logger,

    customLogLevel(req, res, err) {
        if (res.statusCode >= 500 || err) {
            return "error";
        }

        if (res.statusCode >= 400) {
            return "warn";
        }

        return "info";
    },

    customSuccessMessage(req, res) {
        return `${req.method} ${req.url} completed`;
    },

    customErrorMessage(req, res) {
        return `${req.method} ${req.url} failed`;
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