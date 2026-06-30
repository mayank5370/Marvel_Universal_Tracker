const express = require("express");
const auth = require("../../../middlewares/auth");
const authorize = require("../../../middlewares/authorize");
const sourceController = require("./source.controller");

const router = express.Router();

router.get(
    "/sources",
    auth,
    authorize("ADMIN"),
    sourceController.getAllSources
);

router.post(
    "/sources",
    auth,
    authorize("ADMIN"),
    sourceController.createSource
);

router.patch(
    "/sources/:id",
    auth,
    authorize("ADMIN"),
    sourceController.updatedSource
);

module.exports = router;