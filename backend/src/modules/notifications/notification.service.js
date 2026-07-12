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

    console.log(
        "Notification Service Started:",
        contentItemId
    );

};

module.exports = {
    getNotifications,
    processNewContent,
};