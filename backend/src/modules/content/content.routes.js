const express = require("express");
const contentController = require("./content.controller");
const router = express.Router();

router.post(
    "/ingest",
    contentController.ingestContent
);

module.exports = router;