const adminService = require("./dashboard.service");
const ApiResponse = require("../../../utils/ApiResponse");
const asyncHandler = require("../../../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {

    const result = await dashboardService.getDashboardStats();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Dashboard statistics fetched successfully",
            result
        )
    );

});
module.exports = {
    getDashboardStats,
};
