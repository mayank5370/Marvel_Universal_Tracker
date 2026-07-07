const prisma = require("../../../config/prisma");
const ApiError = require("../../../utils/ApiError");
const { CONTENT_STATUS } = require("../../../utils/ApiError");

const slugify = require("../../../utils/slugify");


const checkDuplicate = async (sourceUrl) => {
  const content = await prisma.contentItem.findUnique({
    where: {
      sourceUrl,
    },
  });
  return {
    exists: !!content,
  };
};

const getFeed = async (
  page = 1,
  limit = 10
) => {

  const skip =
    (page - 1) * limit;

  const total =
    await prisma.contentItem.count({
      where: {
        status: CONTENT_STATUS.APPROVED,
      },
    });

  const feed =
    await prisma.contentItem.findMany({
      where: {
        status: CONTENT_STATUS.APPROVED,
      },

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

        aiEnrichment: {
          select: {
            tldr: true,
            importanceScore: true,
            spoilerRisk: true,
            tags: true,
          },
        },
      },

      orderBy: {
        publishedAt: "desc",
      },

      skip,
      take: limit,
    });

  return {
    pagination: {
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
    },

    data: feed,
  };
};

const getContentBySlug = async (slug) => {
  const content = await prisma.contentItem.findUnique({
    where: {
        slug,
    },

    include: {
        source: true,
        aiEnrichment: true,
        prerequisites: true,
    },
});

  if (!content) {
    throw new ApiError(
      404,
      "Content not found"
    );
  }

  return content;
};

const searchContent = async ({
  q,
  type,
  spoilerRisk,
  sort,
}) => {

  const where = {
    status: CONTENT_STATUS.APPROVED,
  };

  if (q) {
    where.OR = [
      {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        summary: {
          contains: q,
          mode: "insensitive",
        },
      },
    ];
  }

  if (type) {
    where.contentType = type;
  }

  const orderBy = {};

  if (sort === "importance") {
    orderBy.aiEnrichment = {
      importanceScore: "desc",
    };
  } else {
    orderBy.publishedAt = "desc";
  }

  const results =
    await prisma.contentItem.findMany({

      where: {
        ...where,

        ...(spoilerRisk && {
          aiEnrichment: {
            spoilerRisk,
          },
        }),
      },

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

        aiEnrichment: {
          select: {
            importanceScore: true,
            spoilerRisk: true,
            tldr: true,
          },
        },
      },

      orderBy,
    });

  return results;
};

const getPendingContent = async () => {

  const contents =
    await prisma.contentItem.findMany({

      where: {
        status: CONTENT_STATUS.PENDING,
      },

      include: {
        source: true,
        aiEnrichment: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return contents;
};

const getAllContentAdmin = async () => {

  const contents =
    await prisma.contentItem.findMany({

      include: {
        source: true,
        aiEnrichment: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return contents;
};

module.exports = {
  checkDuplicate,
  getFeed,
  getContentBySlug,
  searchContent,
  getPendingContent,
  getAllContentAdmin,
};