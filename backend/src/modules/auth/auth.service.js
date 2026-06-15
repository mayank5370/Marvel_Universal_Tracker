const bcrypt = require("bcrypt");
const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppErrror");
const { generateAccessToken, generateReferenceToken } = require("../../utils/jwt");


const registerUser = async (payload) => {
    const { email, password } = payload;
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new Error("User alreay exists");
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


const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new AppError(
            "Invalid Credentials",
            401
        );
    }

    const passwordMatched = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatched) {
        throw new AppError(
            "Invalid Credentials",
            401
        );
    }

    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateReferenceToken(jwtPayload);

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
    registerUser,
    loginUser,
};