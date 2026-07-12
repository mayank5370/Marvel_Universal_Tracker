const prisma = require("../../../config/prisma");
const { CONTENT_STATUS } = require("../../../utils/constants");


const getDashboardStats = async () => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
        totalContent,
        pendingContent,
        approvedContent,
        rejectedContent,
        todayContent,
        totalSources,
        activeSources,
        importance,

        contentTypes,

        recentContent,

        topSources,

    ] = await Promise.all([

        prisma.contentItem.count(),

        prisma.contentItem.count({
            where: {
                status: CONTENT_STATUS.PENDING,
            },
        }),

        prisma.contentItem.count({
            where: {
                status: CONTENT_STATUS.APPROVED,
            },
        }),

        prisma.contentItem.count({
            where: {
                status: CONTENT_STATUS.REJECTED,
            },
        }),

        prisma.contentItem.count({
            where: {
                createdAt: {
                    gte: today,
                },
            },
        }),

        prisma.source.count(),

        prisma.source.count({
            where: {
                isActive: true,
            },
        }),

        prisma.aiEnrichment.aggregate({
            _avg: {
                importanceScore: true,
            },
        }),

        prisma.contentItem.groupBy({
            by: ["contentType"],
            _count: true,
        }),

        prisma.contentItem.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                status: true,
                publishedAt: true,
                contentType: true,
            },
        }),

        prisma.source.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        contentItems: true,
                    },
                },
            },
            orderBy: {
                contentItems: {
                    _count: "desc",
                },
            },
            take: 5,
        }),

    ]);

};


module.exports = {
    getDashboardStats,
};