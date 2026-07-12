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

module.exports = {
    getNotifications,
};