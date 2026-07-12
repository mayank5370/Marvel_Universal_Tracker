const prisma = require("../../config/prisma");
const ApiError = require("../../utils/ApiError");
const { CONTENT_STATUS } = require("../../utils/constants");

const addToWatchlist = async (userId, contentItemId) => {

    const existing = await prisma.watchlistItem.findUnique({
        where: {
            userId_contentItemId: {
                userId,
                contentItemId,
            },
        },
    });

    if (existing) {
        throw new ApiError(
            409,
            "Content already exists in watchlist."
        );
    }

    const content = await prisma.contentItem.findUnique({
        where: {
            id: contentItemId,
        },
    });

    if (!content) {
        throw new ApiError(
            404,
            "Content not found."
        );
    }

    const item = await prisma.watchlistItem.create({
        data: {
            userId,
            contentItemId,
        },
        include: {
            contentItem: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    thumbnailUrl: true,
                    contentType: true,
                },
            },
        },
    });

    return item;
};

const getMyWatchList = async (userId) => {

    const watchlist = await prisma.watchlistItem.findMany({
        where: {
            userId,
        },

        include: {
            contentItem: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    thumbnailUrl: true,
                    contentType: true,
                    publishedAt: true,
                    status: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return watchlist;
};

const updateWatchlistItem = async (
    userId,
    watchlistId,
    watched
) => {

    const existing = await prisma.watchlistItem.findFirst({
        where: {
            id: watchlistId,
            userId,
        },
    });

    if (!existing) {
        throw new ApiError(
            404,
            "Watchlist item not found."
        );
    }

    const updatedItem = await prisma.watchlistItem.update({
        where: {
            id: watchlistId,
        },
        data: {
            watched,
        },
    });

    return updatedItem;
};

const removeWatchlistItem = async (
    userId,
    watchlistId
) => {

    const existing = await prisma.watchlistItem.findFirst({
        where: {
            id: watchlistId,
            userId,
        },
    });

    if (!existing) {
        throw new ApiError(
            404,
            "Watchlist item not found."
        );
    }

    await prisma.watchlistItem.delete({
        where: {
            id: watchlistId,
        },
    });

    return {
        deleted: true,
    };
};

const getUpcomingWatchlist = async (userId) => {

    const now = new Date();

    const upcoming = await prisma.watchlistItem.findMany({

        where: {
            userId,
            watched: false,

            contentItem: {
                status: "APPROVED",
                publishedAt: {
                    gt: now,
                },
            },
        },

        include: {

            contentItem: {

                select: {

                    id: true,

                    title: true,

                    slug: true,

                    summary: true,

                    thumbnailUrl: true,

                    publishedAt: true,

                    contentType: true,

                    source: {
                        select: {
                            name: true,
                        },
                    },

                },

            },

        },

        orderBy: {
            contentItem: {
                publishedAt: "asc",
            },
        },

    });

    return upcoming;

};

module.exports = {
    addToWatchlist,
    getMyWatchList,
    updateWatchlistItem,
    removeWatchlistItem,
    getUpcomingWatchlist,
};