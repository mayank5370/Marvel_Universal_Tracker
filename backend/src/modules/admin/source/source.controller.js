const { success } = require("zod");
const sourceService = require("./source.service");
const ApiResponse = require("../../../utils/ApiResponse");
const asyncHandler = require("../../../utils/asyncHandler");


const getAllSources = asyncHandler(async (req, res) => {

    const result = await sourceService.getAllSources();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Sources fetched successfully",
            {
                count: result.length,
                sources: result,
            }
        )
    );

});

const createSource = asyncHandler(async (req, res) => {

    const result = await sourceService.createSource(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "Source created successfully",
            result
        )
    );

});

const updatedSource = asyncHandler(async (req, res) => {

    const result = await sourceService.updatedSource(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Source updated successfully",
            result
        )
    );

});

const toggleSource = asyncHandler(async (req, res) => {

    const result = await sourceService.toggleSource(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Source status updated successfully",
            result
        )
    );

});

const testSourceFeed = asyncHandler(async (req, res) => {

    const result = await sourceService.testSourceFeed(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "RSS feed validated successfully",
            result
        )
    );

});

const getSourceStats = asyncHandler(async (req, res) => {

    const result = await sourceService.getSourceStats(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Source statistics fetched successfully",
            result
        )
    );

});

module.exports = {
    getAllSources,
    createSource,
    updatedSource,
    toggleSource,
    testSourceFeed,
    getSourceStats,
};