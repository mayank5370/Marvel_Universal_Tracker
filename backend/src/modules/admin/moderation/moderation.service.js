const prisma = require("../../../config/prisma");
const ApiError = require("../../../utils/ApiError");
const { CONTENT_STATUS } = require("../../../utils/constants");

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
            status: CONTENT_STATUS.APPROVED,
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

const rejectContent = async (id) => {

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
            `Cannot reject content with status ${content.status}`
        );
    }

    const updatedContent = await prisma.contentItem.update({
        where: {
            id,
        },
        data: {
            status: CONTENT_STATUS.REJECTED,
        },
        select: {
            id: true,
            title: true,
            status: true,
            updatedAt: true,
        },
    });

    return updatedContent;
};

module.exports = {
    getPendingContent,
    getContentDetails,
    approvedContent,
    rejectContent,
};