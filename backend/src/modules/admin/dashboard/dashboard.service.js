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

        approvedToday,
        rejectedToday,

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

        prisma.contentItem.count({
            where: {
                status: CONTENT_STATUS.APPROVED,
                updatedAt: {
                    gte: today,
                },
            },
        }),

        prisma.contentItem.count({
            where: {
                status: CONTENT_STATUS.REJECTED,
                updatedAt: {
                    gte: today,
                },
            },
        }),

        prisma.contentItem.groupBy({
            by: ["contentType"],
            _count: true,
        }),

        prisma.contentItem.findMany({
            take: 5,
            orderBy: {
                publishedAt: "desc",
            },
            select: {
                id: true,
                title: true,
                status: true,
                contentType: true,
                publishedAt: true,
                source: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        }),

        prisma.source.findMany({
            take: 5,
            orderBy: {
                contentItems: {
                    _count: "desc",
                },
            },
            select: {
                id: true,
                name: true,
                isActive: true,
                lastSyncAt: true,
                lastError: true,
                _count: {
                    select: {
                        contentItems: true,
                    },
                },
            },
        }),
    ]);

    return {
        overview: {
            totalContent,
            pendingContent,
            approvedContent,
            rejectedContent,
            todayContent,
            totalSources,
            activeSources,
            averageImportance: importance._avg.importanceScore
                ? Number(importance._avg.importanceScore.toFixed(2))
                : 0,
        },

        moderationOverview: {
            pending: pendingContent,
            approvedToday,
            rejectedToday,
        },

        contentTypes: contentTypes.map(item => ({
            type: item.contentType,
            count: item._count,
        })),

        recentContent,

        topSources: topSources.map((source) => ({
            id: source.id,
            name: source.name,
            articleCount: source._count.contentItems,
            isActive: source.isActive,
            lastSyncAt: source.lastSyncAt,
            lastError: source.lastError,
        })),
    };
};

module.exports = {
    getDashboardStats,
};