const express = require("express");
const contentController = require("./content.controller");

const auth = require("../../middlewares/auth");
const authorize = require("../../middlewares/authorize");
const validateRequest = require("../../middlewares/validateRequest");

const { createContentSchema } = require("./content.validatiion");

const router = express.Router();


router.get(
    "/content/check",
    contentController.checkDuplicate
);

router.get(
    "/content/feed",
    contentController.getFeed
);

router.get(
    "/content/search",
    contentController.searchContent
);

router.get(
    "/content/:id",
    contentController.getContentById
);

router.post(
    "/content/ingest",
    validateRequest(createContentSchema),
    contentController.ingestContent
);

router.get(
    "/admin/content/pending",
    auth,
    authorize("ADMIN"),
    contentController.getPendingContent
);

router.get(
    "/admin/content",
    auth,
    authorize("ADMIN"),
    contentController.getAllContentAdmin
);

module.exports = router;

