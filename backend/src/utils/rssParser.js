const Parser = require("rss-parser");

const parser = new Parser({
    timeout: 10000,
});

const parseFeed = async (url) => {
    return await parser.parseURL(url);
};

module.exports = {
    parseFeed,
};