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

const updateSource = async(id, payload) => {
    let {name, baseUrl} = payload;

    if(!name || !baseUrl){
        throw new Error("Name and BaseUrl required");
    }

    
}

module.exports = {
    getAllSources,
    createSource,
};