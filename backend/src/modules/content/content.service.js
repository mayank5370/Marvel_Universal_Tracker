const prisma = require("../../config/prisma");

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const createContent = async (payload) => {
  const existingContent =
    await prisma.contentItem.findUnique({
      where: {
        sourceUrl: payload.sourceUrl,
      },
    });

  if (existingContent) {
    return {
      alreadyExists: true,
      content: existingContent,
    };
  }

  const result = await prisma.$transaction(
    async (tx) => {

      const source = await tx.source.upsert({
        where: {
          name: payload.sourceName,
        },
        update: {},
        create: {
          name: payload.sourceName,
        },
      });

      const contentItem =
        await tx.contentItem.create({
          data: {
            title: payload.title,
            slug: slugify(payload.title),
            summary: payload.summary,
            content: payload.content,
            thumbnailUrl: payload.thumbnailUrl,
            sourceUrl: payload.sourceUrl,
            publishedAt: new Date(payload.publishedAt),
            contentType: payload.contentType,
            sourceId: source.id,
          },
        });

      const aiEnrichment =
        await tx.aiEnrichment.create({
          data: {
            contentItemId: contentItem.id,
            tldr: payload.ai.tldr,
            importanceScore:
              payload.ai.importanceScore,
            spoilerRisk:
              payload.ai.spoilerRisk,
            tags: payload.ai.tags,
            entities: payload.ai.entities,
          },
        });

      return {
        source,
        contentItem,
        aiEnrichment,
      };
    }
  );

  return result;
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
        status: "PENDING",
      },
    });

  const feed =
    await prisma.contentItem.findMany({
      where: {
        status: "PENDING",
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

const getContentById = async (id) => {
  const content = await prisma.contentItem.findUnique({
    where: {
      id,
    },

    include: {
      source: true,
      aiEnrichment: true,
      prerequisites: true,
    },
  });

  if (!content) {
    throw new Error("Content Not Found!");
  }

  return content;
}

module.exports = {
  createContent,
  getFeed,
  getContentById,
};