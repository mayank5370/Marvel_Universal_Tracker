const cron = require("node-cron");
const path = require("path");

const servicePath = require.resolve("../services/rss.service");

const rssService = require("../services/rss.service");

const logger = require("../logger/logger");

const startRSSScheduler = () => {
    cron.schedule("* * * * *", async () => {
        logger.info("Starting RSS synchronization...");

        try {
            await rssService.syncFeeds();
            logger.info("RSS synchronization completed.");
        } catch (error) {
            logger.error(error);
        }
    });
};

module.exports = {
    startRSSScheduler,
};