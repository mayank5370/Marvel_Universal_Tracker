const express = require("express");

const auth = require("../../middlewares/auth");

const notificationController = require("./notification.controller");

const router = express.Router();

router.get(
    "/notifications",
    auth,
    notificationController.getNotifications
);

module.exports = router;