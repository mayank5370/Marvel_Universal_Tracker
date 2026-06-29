const express = require("express");
const auth = require("../../../middlewares/auth");
const authorize = require("../../../middlewares/authorize");
const adminController = require("./dashboard.controller");

const router = express.Router();

router.get(
    "/dashboard",
    auth,
    authorize("ADMIN"),
    adminController.getDashboardStats
);

module.exports = router;
