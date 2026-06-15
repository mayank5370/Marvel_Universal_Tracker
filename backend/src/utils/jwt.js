const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        env.jwtAccessSecret,
        {
            expiresIn: env.jwtAccessExpiry,
        }
    );
};

const generateReferenceToken = (payload) => {
    return jwt.sign(
        payload,
        env.jwtRefreshSecret,
        {
            expiresIn: env.jwtRefreshExpiry,
        }
    );
};

module.exports = {
    generateAccessToken,
    generateReferenceToken,
};