const notificationService = require("./notification.service");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getNotifications = asyncHandler(async (req, res) => {

    const result = await notificationService.getNotifications(
        req.user.userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Notifications fetched successfully",
            result,
            {
                count: result.length,
            }
        )
    );

});

module.exports = {
    getNotifications,
};