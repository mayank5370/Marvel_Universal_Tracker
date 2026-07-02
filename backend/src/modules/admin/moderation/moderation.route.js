const express = require("express");

const auth = require("../../../middlewares/auth");
const authorize = require("../../../middlewares/authorize");
const { USER_ROLE } = require("../../../utils/constants");

const moderationController = require("./moderation.controller");

const router = express.Router();

router.get(
    "/content/pending",
    auth,
    authorize(USER_ROLE.ADMIN),
    moderationController.getPendingContent
);

router.get(
    "/content/:id",
    auth,
    authorize(USER_ROLE.ADMIN),
    moderationController.getContentDetails
);

router.patch(
    "/content/:id/approve",
    auth,
    authorize(USER_ROLE.ADMIN),
    moderationController.approvedContent
);

router.patch(
    "/content/:id/reject",
    auth,
    authorize(USER_ROLE.ADMIN),
    moderationController.rejectContent
);


module.exports = router;