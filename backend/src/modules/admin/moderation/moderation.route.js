const express = require("express");

const auth = require("../../../middlewares/auth");
const authorize = require("../../../middlewares/authorize");

const moderationController = require("./moderation.controller");

const router = express.Router();

router.get(
    "/content/pending",
    auth,
    authorize("ADMIN"),
    moderationController.getPendingContent
);

router.get(
    "/content/:id",
    auth,
    authorize("ADMIN"),
    moderationController.getContentDetails
);

router.patch(
    "/content/:id/approve",
    auth,
    authorize("ADMIN"),
    moderationController.approvedContent
);

router.patch(
    "/content/:id/reject",
    auth,
    authorize("ADMIN"),
    moderationController.rejectContent
);


module.exports = router;