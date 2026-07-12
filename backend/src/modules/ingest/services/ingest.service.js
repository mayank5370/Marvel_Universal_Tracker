const prisma = require("../../../config/prisma");
const ApiError = require("../../../utils/ApiError");
const { getIO } = require("../../../socket/socket");
const notificationService = require("../../notifications/notification.service");

class IngestService {

    async ingest(payload) {



        const items = Array.isArray(payload)
            ? payload
            : [payload];

        const createdItems = [];

        for (const item of items) {


            const source = await prisma.source.findUnique({
                where: {
                    name: item.sourceName,
                },
            });


            if (!source) {
                throw new ApiError(
                    404,
                    `Source '${item.sourceName}' not found`
                );
            }


            try {

                const created = await prisma.$transaction(async (tx) => {

                    const contentItem = await tx.contentItem.create({
                        data: {
                            title: item.title,
                            slug: item.slug,
                            summary: item.summary,
                            content: item.content,
                            thumbnailUrl: item.thumbnailUrl || null,
                            sourceUrl: item.sourceUrl,
                            publishedAt: new Date(item.publishedAt),
                            contentType: item.contentType,
                            sourceId: source.id,
                        },
                    });


                    await tx.aiEnrichment.create({
                        data: {
                            contentItemId: contentItem.id,
                            tldr: item.ai.tldr,
                            importanceScore: item.ai.importanceScore,
                            spoilerRisk: item.ai.spoilerRisk,
                            tags: item.ai.tags,
                            entities: item.ai.entities,
                        },
                    });



                    return contentItem;
                });

                createdItems.push(created);

                await notificationService.processNewContent(
                    created.id
                );

                getIO().emit("feed:new_items", {

                    id: created.id,

                    title: created.title,

                    slug: created.slug,

                    contentType: created.contentType,

                    publishedAt: created.publishedAt,

                });

            } catch (error) {
                if (error.code === "P2002") {
                    throw new ApiError(
                        409,
                        "Content already exists."
                    );
                }

                throw error
            }


        }
        return {
            processed: items.length,
            created: createdItems.length,
            items: createdItems,
        };

    }
}

module.exports = new IngestService();