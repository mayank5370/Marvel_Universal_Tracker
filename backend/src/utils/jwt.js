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

const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        env.jwtRefreshSecret,
        {
            expiresIn: env.jwtRefreshExpiry,
        }
    );
};

//Added JWT Verify Headers
const  verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        env.jwtAccessSecret
    );
};


const verifyRefreshToekn = (token) => {
    return jwt.verify(
        token,
        env.jwtRefreshSecret
    );
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToekn,
};