const express = require("express");

const auth = require("../../middlewares/auth");

const watchlistController = require("./watchlist.controller");

const validateRequest = require("../../middlewares/validateRequest");

const {
    addWatchlistSchema,
    updateWatchlistSchema,
} = require("./watchist.validation");
const router = express.Router();

router.post(
    "/watchlist",
    auth,
    validateRequest(addWatchlistSchema),
    watchlistController.addToWatchlist
);


router.get(
    "/watchlist",
    auth,
    watchlistController.getMyWatchList
);

router.patch(
    "/watchlist/:id",
    auth,
    validateRequest(updateWatchlistSchema),
    watchlistController.updateWatchlistItem
);

router.delete(
    "/watchlist/:id",
    auth,
    watchlistController.removeWatchlistItem
);

module.exports = router;