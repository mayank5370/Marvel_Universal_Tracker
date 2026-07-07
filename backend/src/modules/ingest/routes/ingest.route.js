const express = require("express");

const router = express.Router();

const controller = require("../controller/ingest.controller");

const verifyApiKey = require("../middlewares/verifyApiKey");

const validateIngest = require("../validations/validateIngest");

router.post(
    "/",
    verifyApiKey,
    validateIngest,
    controller.ingest
);

module.exports = router;