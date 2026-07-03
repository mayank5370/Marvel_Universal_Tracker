const prisma = require("../../../config/prisma");
const { CONTENT_STATUS } = require("../../../utils/constants");

const getDashboardStats = async () => {

    const totalContent = await prisma.contentItem.count();

    const pendingContent = await prisma.contentItem.count({
        where: {
            status: CONTENT_STATUS.PENDING,
        },
    });

    const approvedContent = await prisma.contentItem.count({
        where: {
            status: CONTENT_STATUS.APPROVED,
        },
    });

    const rejectedContent = await prisma.contentItem.count({
        where: {
            status: CONTENT_STATUS.REJECTED,
        },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayContent = await prisma.contentItem.count({
        where: {
            createdAt: {
                gte: today,
            },
        },
    });

    const totalSources = await prisma.source.count();

    const activeSources = await prisma.source.count({
        where: {
            isActive: true,
        },
    });

    const importance = await prisma.aiEnrichment.aggregate({
        _avg: {
            importanceScore: true,
        },
    });

    return {
        totalContent,
        pendingContent,
        approvedContent,
        rejectedContent,
        todayContent,
        totalSources,
        activeSources,
        averageImportance: importance._avg.importanceScore || 0,
    };
};

module.exports = {
    getDashboardStats,
};