const axios = require("axios");
const Parser = require("rss-parser");

const parser = new Parser();

const parseFeed = async (url) => {
    try {
        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
                "Accept":
                    "application/rss+xml, application/xml, text/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });

        const feed = await parser.parseString(response.data);

        return feed;
    } catch (error) {

        if (error.response?.status === 404) {
            throw new Error("RSS feed not found");
        }

        if (error.response?.status === 403) {
            throw new Error("RSS provider denied access");
        }

        if (error.code === "ECONNABORTED") {
            throw new Error("RSS request timed out");
        }

        throw new Error(error.message);
    }
};

module.exports = {
    parseFeed,
};