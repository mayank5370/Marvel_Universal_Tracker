const prisma = require("../../config/prisma");
const createContent = async (payload) => {
    const existingContent = await prisma.contentItem.findUnique({
        where: {
            sourceUrl: payload.sourceUrl,
        },
    });

    if(existingContent){
        return {
            alreadyExists: true,
            content: existingContent,
        };
    }

    return {
        alreadyExists: false,
    };
};

module.exports = {
    createContent,
};
