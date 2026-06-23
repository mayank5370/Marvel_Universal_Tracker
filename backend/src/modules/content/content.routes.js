const express = require("express");
const contentController = require("./content.controller");
const router = express.Router();

router.get(
    "/content/feed",
    contentController.getFeed
);

router.get(
    "/content/:id",
    contentController.getContentById
);

router.post(
    "/ingest",
    contentController.ingestContent
);

module.exports = router;

