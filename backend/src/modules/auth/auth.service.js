const bcrypt = require("bcrypt");
const prisma = require("../../config/prisma");

const registerUser = async (payload) => {
    const{email,password} = payload;
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(existingUser){
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

module.exports = {
    registerUser,
};