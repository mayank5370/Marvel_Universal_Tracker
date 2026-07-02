const { success } = require("zod");
const sourceService = require("./source.service");
const ApiResponse = require("../../../utils/ApiResponse");
const asyncHandler = require("../../../utils/asyncHandler");


const getAllSources = async (req, res, next) => {
    try {
        const result = await sourceService.getAllSources();

        return res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

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

const updatedSource = async (req, res, next) => {
    try {
        const result = await sourceService.updatedSource(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Source updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const toggleSource = async (req, res, next) => {
    try {
        const result = await sourceService.toggleSource(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Source status updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const testSourceFeed = async (req, res, next) => {
    try {
        const result = await sourceService.testSourceFeed(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "RSS feed is Valid",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

const getSourceStats = async (req, res, next) => {
    try {

        const result = await sourceService.getSourceStats(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSources,
    createSource,
    updatedSource,
    toggleSource,
    testSourceFeed,
    getSourceStats,
};