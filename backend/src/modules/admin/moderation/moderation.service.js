const prisma = require("../../../config/prisma");

const getPendingContent = async () => {

    const pendingContent = await prisma.contentItem.findMany({
        where: {
            status: "PENDING",
        },
        orderBy: {
            publishedAt: "desc",
        },
        select: {
            id: true,
            title: true,
            summary: true,
            publishedAt: true,
            contentType: true,
            status: true,

            source: {
                select: {
                    name: true,
                },
            },

            aiEnrichment: {
                select: {
                    importanceScore: true,
                    spoilerRisk: true,
                },
            },
        },
    });

    return pendingContent;
};

const getContentDetails = async (id) => {
    const content = await prisma.contentItem.findUnique({
        where: {
            id,
        },
        include: {
            source: {
                select: {
                    id: true,
                    name: true,
                },
            },
            aiEnrichment: true,
        },
    });

    if (!content) {
        throw new Error("Content not found");
    }

    return content;
};

const approvedContent = async (id) => {
    const content = await prisma.contentItem.findUnique({
        where: {
            id,
        },
    });

    if (!content) {
        throw new Error("Content not found");
    }

    if (content.status !== "PENDING") {
        throw new Error(
            `Cannot approve content with status ${content.status}`
        );
    }

    const updateContent = await prisma.contentItem.update({
        where: { id },
        data: {
            status: "APPROVED",
        },
        select: {
            id: true,
            title: true,
            status: true,
            updatedAt: true,
        },
    });

    return updateContent;
}

module.exports = {
    getPendingContent,
    getContentDetails,
    approvedContent,
};