// const prisma = require("../../config/prisma");

// const getNotifications = async (userId) => {

//     return prisma.notification.findMany({

//         where: {
//             userId,
//         },

//         include: {

//             contentItem: {

//                 select: {
//                     id: true,
//                     title: true,
//                     slug: true,
//                     thumbnailUrl: true,
//                     contentType: true,
//                 },

//             },

//         },

//         orderBy: {
//             createdAt: "desc",
//         },

//     });

// };

// const processNewContent = async (contentItemId) => {

//     console.log(
//         "Notification Service Started:",
//         contentItemId
//     );

// };

// module.exports = {
//     getNotifications,
//     processNewContent,
// };

const prisma = require("../../config/prisma");

const getNotifications = async (userId) => {

    return prisma.notification.findMany({

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
        },

    });

};

const processNewContent = async (contentItemId) => {

    console.log("========== Notification Service ==========");

    console.log("Loading Content:", contentItemId);

    const content = await prisma.contentItem.findUnique({

        where: {
            id: contentItemId,
        },

        include: {
            aiEnrichment: true,
            source: true,
        },

    });

    if (!content) {

        console.log("Content not found");

        return;

    }

    console.log("Content Loaded");

    console.log("Title:", content.title);

    console.log("Tags:", content.aiEnrichment?.tags);

    console.log("Entities:", content.aiEnrichment?.entities);

    const watchlists = await prisma.watchlistItem.findMany({
        where: {
            watched: false,
        },

        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },

            contentItem: {
                include: {
                    aiEnrichment: true,
                },
            },
        },
    });

    console.log(
        "Total Watchlists:",
        watchlists.length
    );

    for (const watchlist of watchlists) {

        console.log("--------------------------------");

        console.log(
            "User:",
            watchlist.user.email
        );

        console.log(
            "Watching:",
            watchlist.contentItem.title
        );

        console.log(
            "Tags:",
            watchlist.contentItem.aiEnrichment?.tags
        );

        console.log(
            "Entities:",
            watchlist.contentItem.aiEnrichment?.entities
        );

    }

};

module.exports = {
    getNotifications,
    processNewContent,
};