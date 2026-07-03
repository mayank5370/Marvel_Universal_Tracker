const express = require("express");
const authController = require("./auth.controller");
const auth = require("../../middlewares/auth");
const validateRequest = require("../../middlewares/validateRequest");
const { registerSchema, loginSchema, } = require("./auth.validation");
const router = express.Router();

router.post(
    "/register",
    validateRequest({
        body: registerSchema,
    }),
    authController.register
);

router.post(
    "/login",
    validateRequest({
        body: loginSchema
    }),
    authController.login
);

router.get(
    "/me",
    auth,
    authController.getProfile
);


module.exports = router;