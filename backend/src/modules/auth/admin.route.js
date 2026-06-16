const express = require("express");
const auth = require("../../middlewares/auth");
const authorize = require("../../middlewares/authorize");
const router = express.Router();

router.get(
    "/dashboard",
    auth,
    authorize("ADMIN"),
    (req, res) => {
        return res.status(200).json({
            success: true,
            message: "Welcome Admin",
        });
    }
);

module.exports = router;
