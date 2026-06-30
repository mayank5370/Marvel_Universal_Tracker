const prisma = require("../../../config/prisma");

const getAllSources = async () => {
    const source = await prisma.source.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return source;
};

const createSource = async (payload) => {
    let { name, baseUrl } = payload;

    if (!name || !baseUrl) {
        throw new Error("Name and BaseUrl are required");
    }

    name = name.trim();
    baseUrl = baseUrl.trim();

    const existingSource = await prisma.source.findFirst({
        where: {
            OR: [
                { name },
                { baseUrl },
            ],
        },
    });

    if (existingSource) {
        throw new Error("Source already exists");
    }

    const source = await prisma.source.create({
        data: {
            name,
            baseUrl,
            isActive: true,
        },
    });

    return source;
};

const updatedSource = async (id, payload) => {
    let { name, baseUrl } = payload;

    if (!name || !baseUrl) {
        throw new Error("Name and BaseUrl required");
    }

    name = name.trim();
    baseUrl = baseUrl.trim();

    const source = await prisma.source.findUnique({
        where: {
            id,
        },
    });

    if (!source) {
        throw new Error("Source not found");
    }

    const duplicate = await prisma.source.findFirst({
        where: {
            id: {
                not: id,
            },
            OR: [
                { name },
                { baseUrl },
            ],
        },
    });

    if (duplicate) {
        throw new Error("Another source already exists with this name oe URL");
    }

    const updatedSource = await prisma.source.update({
        where: {
            id,
        },
        data: {
            name,
            baseUrl,
        },
    });

    return updatedSource;
};

const toggleSource = async (id) => {
    const source = await prisma.source.findUnique({
        where: {
            id,
        },
    });

    if (!source) {
        throw new Error("Source not found");
    }

    const updatedSource = await prisma.source.update({
        where: {
            id,
        },
        data: {
            isActive: !source.isActive,
        },
    });

    return updatedSource;
}

module.exports = {
    getAllSources,
    createSource,
    updatedSource,
    toggleSource,
};