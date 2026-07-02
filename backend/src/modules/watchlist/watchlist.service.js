const prisma = require("../../config/prisma");
const ApiError = require("../../utils/ApiError");

const addToWatchlist = async (
    userId,
    contentItemId
) => {
    const existing = await prisma.watchlistItem.findUnique({
        where: {
            userId_contentItemId: {
                userId,
                contentItemId,
            },
        },
    });

    if (existing) {
        throw new Error("Content already exists in Watch-List");
    }

    const item = await prisma.watchlistItem.create({
        data: {
            userId,
            contentItemId,
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
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        }
    });

    return watchlist;
};


const updateWatchlistItem = async (userId, watchlistId, watched) => {
    const existing = await prisma.watchlistItem.findFirst({
        where: {
            id: watchlistId,
            userId,
        },
    });

    if (!existing) {
        throw new ApiError(
            409,
            "Content already exists in watchlist"
        );
    }

    const updateItem = await prisma.watchlistItem.update({
        where: {
            id: watchlistId,
        },
        data: {
            watched,
        },
    });

    return updateItem;
};

const removeWatchlistItem = async (userId, watchlistId) => {
    const existing = await prisma.watchlistItem.findFirst({
        where: {
            id: watchlistId,
            userId,
        },
    });

    if (!existing) {
        throw new ApiError(
            404,
            "Watchlist item not found"
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


module.exports = {
    addToWatchlist,
    getMyWatchList,
    updateWatchlistItem,
    removeWatchlistItem,
};