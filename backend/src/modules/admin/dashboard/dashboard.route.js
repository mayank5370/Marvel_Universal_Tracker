const express = require("express");
const auth = require("../../../middlewares/auth");
const authorize = require("../../../middlewares/authorize");
const adminController = require("./dashboard.controller");
const { USER_ROLE } = require("../../../utils/constants");

const router = express.Router();

router.get(
    "/dashboard",
    auth,
    authorize(USER_ROLE.ADMIN),
    adminController.getDashboardStats
);

module.exports = router;
