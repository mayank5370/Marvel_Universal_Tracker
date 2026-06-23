const { success } = require("zod");
const watchlistService = require("./watchlist.service");

const addToWatchlist = async (req, res, next) => {
    try {
        const result = await watchlistService.addToWatchlist(
            req.user.userId,
            req.body.contentItemId
        );

        return res.status(200).json({
            success: true,
            message: "Added to Watch-List",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

const getMyWatchList = async (req, res, next) => {
    try {
        const result = await watchlistService.getMyWatchList(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateWatchlistItem = async (req, res, next) => {
    try {
        const result = await watchlistService.updateWatchlistItem(
            req.user.userId,
            req.params.id,
            req.body.watched
        );

        return res.status(200).json({
            success: true,
            message: "Watchlist Updated",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    addToWatchlist,
    getMyWatchList,
    updateWatchlistItem,
};