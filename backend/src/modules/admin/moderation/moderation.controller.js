const moderationService = require("./moderation.service");
const ApiResponse = require("../../../utils/ApiResponse");
const asyncHandler = require("../../../utils/asyncHandler");

const getPendingContent = asyncHandler(async (req, res) => {

    const result = await moderationService.getPendingContent();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Pending content fetched successfully",
            {
                count: result.length,
                content: result,
            }
        )
    );

});

const getContentDetails = asyncHandler(async (req, res) => {

    const result = await moderationService.getContentDetails(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Content details fetched successfully",
            result
        )
    );

});

const approvedContent = asyncHandler(async (req, res) => {

    const result = await moderationService.approvedContent(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Content approved successfully",
            result
        )
    );

}); 

const rejectContent = asyncHandler(async (req, res) => {

    const result = await moderationService.rejectContent(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Content rejected successfully",
            result
        )
    );

});


module.exports = {
    getPendingContent,
    getContentDetails,
    approvedContent,
    rejectContent,
};