const prisma = require("../../../config/prisma");
const { isValidFeedUrl } = require("../../../utils/feedValidator");
const { parseFeed } = require("../../../utils/rssParser");
const ApiError = require("../../../utils/ApiError");

const getAllSources = async () => {
    const source = await prisma.source.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return source;
};

const createSource = async (payload) => {
    let { name, baseUrl } = payload;

    if (!name || !baseUrl) {
        throw new ApiError(
            400,
            "Name and BaseUrl are required"
        );
    }

    name = name.trim();
    baseUrl = baseUrl.trim();

    const existingSource = await prisma.source.findFirst({
        where: {
            OR: [
                { name },
                { baseUrl },
            ],
        },
    });

    if (existingSource) {
        throw new ApiError(
            409,
            "Source already exists"
        );
    }

    const source = await prisma.source.create({
        data: {
            name,
            baseUrl,
            isActive: true,
        },
    });

    return source;
};

const updatedSource = async (id, payload) => {
    let { name, baseUrl } = payload;

    if (!name || !baseUrl) {
        throw new ApiError(
            400,
            "Name and BaseUrl required"
        );
    }

    name = name.trim();
    baseUrl = baseUrl.trim();

    const source = await prisma.source.findUnique({
        where: {
            id,
        },
    });

    if (!source) {
        throw new ApiError(
            404,
            "Source not found"
        );
    }

    const duplicate = await prisma.source.findFirst({
        where: {
            id: {
                not: id,
            },
            OR: [
                { name },
                { baseUrl },
            ],
        },
    });

    if (duplicate) {
        throw new Error("Another source already exists with this name oe URL");
    }

    const updatedSource = await prisma.source.update({
        where: {
            id,
        },
        data: {
            name,
            baseUrl,
        },
    });

    return updatedSource;
};

const toggleSource = async (id) => {
    const source = await prisma.source.findUnique({
        where: {
            id,
        },
    });

    if (!source) {
        throw new ApiError(
            404,
            "Source not found"
        );
    }

    const updatedSource = await prisma.source.update({
        where: {
            id,
        },
        data: {
            isActive: !source.isActive,
        },
    });

    return updatedSource;
};

const testSourceFeed = async (id) => {
    const source = await prisma.source.findUnique({
        where: {
            id,
        },
    });

    if (!source) {
        throw new ApiError(
            404,
            "Source not found"
        );
    }

    if (!source.baseUrl) {
        throw new Error("Source does not have a feed URL");
    }

    if (!isValidFeedUrl(source.baseUrl)) {
        throw new Error("Invalid RSS feed URL");
    }

    const feed = await parseFeed(source.baseUrl);

    return {
        reachable: true,
        title: feed.title || "",
        description: feed.description || "",
        link: feed.link || "",
        itemCount: feed.items?.length || 0,
        lastBuildDate: feed.lastBuildDate || null,
    };
};

const getSourceStats = async (id) => {

    const source = await prisma.source.findUnique({
        where: {
            id,
        },
    });

    if (!source) {
        throw new ApiError(
            404,
            "Source not found"
        );
    }

    const totalArticles = await prisma.contentItem.count({
        where: {
            sourceId: id,
        },
    });

    const pendingArticles = await prisma.contentItem.count({
        where: {
            sourceId: id,
            status: "PENDING",
        },
    });

    const approvedArticles = await prisma.contentItem.count({
        where: {
            sourceId: id,
            status: "APPROVED",
        },
    });

    const rejectedArticles = await prisma.contentItem.count({
        where: {
            sourceId: id,
            status: "REJECTED",
        },
    });

    const latestArticle = await prisma.contentItem.findFirst({
        where: {
            sourceId: id,
        },
        orderBy: {
            publishedAt: "desc",
        },
        select: {
            title: true,
            publishedAt: true,
        },
    });

    const oldestArticle = await prisma.contentItem.findFirst({
        where: {
            sourceId: id,
        },
        orderBy: {
            publishedAt: "asc",
        },
        select: {
            title: true,
            publishedAt: true,
        },
    });

    return {
        source: source.name,
        isActive: source.isActive,
        totalArticles,
        pendingArticles,
        approvedArticles,
        rejectedArticles,
        latestArticle,
        oldestArticle,
    };
};

module.exports = {
    getAllSources,
    createSource,
    updatedSource,
    toggleSource,
    testSourceFeed,
    getSourceStats,
};