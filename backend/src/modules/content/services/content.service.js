const prisma = require("../../../config/prisma");
const ApiError = require("../../../utils/ApiError");
const { CONTENT_STATUS } = require("../../../utils/constants");

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

const getFeed = async (cursor, limit = 10) => {

  limit = Number(limit);

  const items = await prisma.contentItem.findMany({

    where: {
      status: "APPROVED",
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

    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        id: "desc",
      },
    ],

    take: limit + 1,

    ...(cursor && {

      cursor: {
        id: cursor,
      },

      skip: 1,

    }),

  });

  const hasMore = items.length > limit;

  if (hasMore) {

    items.pop();

  }

  return {

    items,

    nextCursor: hasMore
      ? items[items.length - 1].id
      : null,

    hasMore,

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

const getHero = async () => {

  const now = new Date();

  const [latestRelease, nextUpcoming] = await Promise.all([

    prisma.contentItem.findFirst({

      where: {
        status: "APPROVED",
        publishedAt: {
          lte: now,
        },
      },

      include: {
        source: true,
        aiEnrichment: true,
      },

      orderBy: {
        publishedAt: "desc",
      },

    }),

    prisma.contentItem.findFirst({

      where: {
        status: "APPROVED",
        publishedAt: {
          gt: now,
        },
      },

      include: {
        source: true,
        aiEnrichment: true,
      },

      orderBy: {
        publishedAt: "asc",
      },

    }),

  ]);

  return {

    latestRelease,

    nextUpcoming,

  };

};

const getPrerequisites = async (slug) => {

  const content =
    await prisma.contentItem.findUnique({

      where: {
        slug,
      },

      select: {

        title: true,

        prerequisites: {

          select: {

            id: true,

            title: true,

            description: true,

          },

        },

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

module.exports = {
  checkDuplicate,
  getFeed,
  getContentBySlug,
  searchContent,
  getPendingContent,
  getAllContentAdmin,
  getHero,
  getPrerequisites,
};