const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    const sources = [

        {
            name: "ComicBook",
            rssUrl: "https://comicbook.com/feed/",
            baseUrl: "https://comicbook.com",
            priority: 1,
        },

        {
            name: "The Direct",
            rssUrl: "https://thedirect.com/feed",
            baseUrl: "https://thedirect.com",
            priority: 2,
        },

        {
            name: "CBR",
            rssUrl: "https://www.cbr.com/feed/",
            baseUrl: "https://www.cbr.com",
            priority: 3,
        },

        {
            name: "SuperHeroHype",
            rssUrl: "https://www.superherohype.com/feed",
            baseUrl: "https://www.superherohype.com",
            priority: 4,
        },

        {
            name: "Inverse",
            rssUrl: "https://www.inverse.com/feed",
            baseUrl: "https://www.inverse.com",
            priority: 5,
        },

        {
            name: "IGN",
            rssUrl: "https://feeds.ign.com/ign/all",
            baseUrl: "https://www.ign.com",
            priority: 6,
        },

        {
            name: "Reddit MarvelStudiosSpoilers",
            rssUrl: "https://www.reddit.com/r/MarvelStudiosSpoilers/.rss",
            baseUrl: "https://reddit.com",
            priority: 7,
        },

        {
            name: "Reddit Marvel",
            rssUrl: "https://www.reddit.com/r/Marvel/.rss",
            baseUrl: "https://reddit.com",
            priority: 8,
        },

        {
            name: "Reddit MarvelStudios",
            rssUrl: "https://www.reddit.com/r/marvelstudios/.rss",
            baseUrl: "https://reddit.com",
            priority: 9,
        },

        {
            name: "Spider-Man News",
            rssUrl: "https://spidermannews.com/feed/",
            baseUrl: "https://spidermannews.com",
            priority: 10,
        },

    ];

    for (const source of sources) {

        await prisma.source.upsert({

            where: {
                name: source.name,
            },

            update: source,

            create: source,

        });

    }

    console.log("✅ Sources Seeded");

}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });