const prisma = require("../../config/prisma");

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
        throw new Error("Watchlist Item Not Found");
    }

    const update = await prisma.watchlistItem.update({
        where: {
            id: watchlistId,
        },
        data: {
            watched,
        },
    });

    return update
};


module.exports = {
    addToWatchlist,
    getMyWatchList,
    updateWatchlistItem,
};