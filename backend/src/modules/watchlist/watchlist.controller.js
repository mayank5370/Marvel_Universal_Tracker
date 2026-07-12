const watchlistService = require("./watchlist.service");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");


const addToWatchlist = asyncHandler(async (req, res) => {

    const result = await watchlistService.addToWatchlist(
        req.user.userId,
        req.body.contentItemId
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Content added to watchlist successfully",
            result
        )
    );

});

const getMyWatchList = asyncHandler(async (req, res) => {

    const result = await watchlistService.getMyWatchList(
        req.user.userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Watchlist fetched successfully",
            result,
            {
                count: result.length,
            }
        )
    );

});

const updateWatchlistItem = asyncHandler(async (req, res) => {

    const result = await watchlistService.updateWatchlistItem(
        req.user.userId,
        req.params.id,
        req.body.watched
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Watchlist updated successfully",
            result
        )
    );

});

const removeWatchlistItem = asyncHandler(async (req, res) => {

    await watchlistService.removeWatchlistItem(
        req.user.userId,
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Content removed from watchlist successfully"
        )
    );

});

const getUpcomingWatchlist = asyncHandler(async (req, res) => {

    const result = await watchlistService.getUpcomingWatchlist(
        req.user.userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Upcoming watchlist fetched successfully",
            result,
            {
                count: result.length,
            }
        )
    );

});


module.exports = {
    addToWatchlist,
    getMyWatchList,
    updateWatchlistItem,
    removeWatchlistItem,
    getUpcomingWatchlist,
};