const bcrypt = require("bcrypt");
const prisma = require("../../config/prisma");
const ApiError = require("../../utils/ApiError");
const { generateAccessToken, generateRefreshToken, } = require("../../utils/jwt");


const register = async (payload) => {
    const { email, password } = payload;
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists"
        );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
        },
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
};


const login = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new ApiError(
            401,
            "Invalid credentials"
        );
    }

    const passwordMatched = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatched) {
        throw new ApiError(
            401,
            "Invalid credentials"
        );
    }

    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    };

};

module.exports = {
    register,
    login,
};