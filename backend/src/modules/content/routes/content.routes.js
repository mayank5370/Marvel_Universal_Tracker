const express = require("express");
const contentController = require("../controller/content.controller");
const auth = require("../../../middlewares/auth");
const authorize = require("../../../middlewares/authorize");
const validateRequest = require("../../../middlewares/validateRequest");
const { USER_ROLE } = require("../../../utils/constants");
const { createContentSchema, searchContentSchema, } = require("../validations/content.validation");
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
    validateRequest({
        query: searchContentSchema,
    }),
    contentController.searchContent
);

router.get(
    "/content/:slug",
    contentController.getContentBySlug
);

router.post(
    "/content/ingest",
    validateRequest({
        body: createContentSchema,
    }),
    contentController.ingestContent
);

router.get(
    "/admin/content/pending",
    auth,
    authorize(USER_ROLE.ADMIN),
    contentController.getPendingContent
);

router.get(
    "/admin/content",
    auth,
    authorize(USER_ROLE.ADMIN),
    contentController.getAllContentAdmin
);

module.exports = router;

