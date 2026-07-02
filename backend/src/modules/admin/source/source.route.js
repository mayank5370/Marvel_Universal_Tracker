const express = require("express");
const auth = require("../../../middlewares/auth");
const authorize = require("../../../middlewares/authorize");
const sourceController = require("./source.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { USER_ROLE } = require("../../../utils/constants");

const { createSourceSchema, updateSourceSchema, } = require("./source.validation");

const router = express.Router();

router.get(
    "/sources",
    auth,
    authorize(USER_ROLE.ADMIN),
    sourceController.getAllSources
);

router.post(
    "/sources",
    auth,
    authorize(USER_ROLE.ADMIN),
    validateRequest(createSourceSchema),
    sourceController.createSource
);

router.patch(
    "/sources/:id",
    auth,
    authorize(USER_ROLE.ADMIN),
    validateRequest(updateSourceSchema),
    sourceController.updatedSource
);

router.patch(
    "/sources/:id/toggle",
    auth,
    authorize(USER_ROLE.ADMIN),
    sourceController.toggleSource
);

router.post(
    "/sources/:id/test",
    auth,
    authorize(USER_ROLE.ADMIN),
    sourceController.testSourceFeed
);

router.get(
    "/sources/:id/stats",
    auth,
    authorize(USER_ROLE.ADMIN),
    sourceController.getSourceStats
);

module.exports = router;