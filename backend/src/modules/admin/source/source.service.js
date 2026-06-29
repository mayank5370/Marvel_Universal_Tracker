const prisma = require("../../../config/prisma");

const getAllSources = async() => {
    const source = await prisma.source.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return source;
};

module.exports = {
    getAllSources,
};