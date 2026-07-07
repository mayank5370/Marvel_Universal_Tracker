const prisma = require("../../../config/prisma");
const  ApiError  = require("../../../utils/ApiError");

class IngestService {

    async ingest(payload) {

        console.log("SERVICE STARTED");

        const items = Array.isArray(payload)
            ? payload
            : [payload];

        console.log("Items:", items.length);

        const createdItems = [];

        for (const item of items) {

            console.log("Processing:", item.title);

            const source = await prisma.source.findUnique({
                where: {
                    name: item.sourceName,
                },
            });

            console.log("Source:", source);

            if (!source) {
                throw new ApiError(
                    404,
                    `Source '${item.sourceName}' not found`
                );
            }

            console.log("Starting Transaction");

            try {

                const created = await prisma.$transaction(async (tx) => {

                    console.log("Creating ContentItem");

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

                    console.log("ContentItem Created:", contentItem.id);

                    console.log("Creating AI Enrichment");

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

                    console.log("AI Enrichment Created");

                    return contentItem;
                });

                createdItems.push(created);
            } catch (error) {
                if (
                    error.code === "P2002" &&
                    error.meta?.target?.includes("slug")
                ) {

                    throw new ApiError(
                        409,
                        "Content already exists."
                    );

                }

                throw error
            }

            console.log("SERVICE COMPLETED");

            return {
                processed: items.length,
                created: createdItems.length,
                items: createdItems,
            };
        }

    }
}

module.exports = new IngestService();