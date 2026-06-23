const express = require("express");

const auth = require("../../middlewares/auth");

const watchlistController = require("./watchlist.controller");

const router = express.Router();

router.post(
    "/watchlist",
    auth,
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
    watchlistController.updateWatchlistItem
);

router.delete(
    "/watchlist/:id",
    auth,
    watchlistController.removeWatchlistItem
);

module.exports = router;