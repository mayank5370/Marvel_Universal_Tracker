const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const contentService = require("./content.service");

const checkDuplicate = asyncHandler(async (req, res) => {

    const { sourceUrl } = req.query;

    const result = await contentService.checkDuplicate(sourceUrl);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Duplicate check completed",
            result
        )
    );

});

const ingestContent = asyncHandler(async (req, res) => {

    const result = await contentService.createContent(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "Content ingested successfully",
            result
        )
    );

});

const getFeed = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await contentService.getFeed(page, limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Content feed fetched successfully",
            result.data,
            result.pagination
        )
    );

});

const getContentById = asyncHandler(async (req, res) => {

    const result = await contentService.getContentById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Content fetched successfully",
            result
        )
    );

});

const searchContent = asyncHandler(async (req, res) => {

    const result = await contentService.searchContent(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Search completed successfully",
            result,
            {
                count: result.length,
            }
        )
    );

});


const getPendingContent = asyncHandler(async (req, res) => {

    const result = await contentService.getPendingContent();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Pending content fetched successfully",
            result,
            {
                count: result.length,
            }
        )
    );
});

const getAllContentAdmin = asyncHandler(async (req, res) => {

    const result = await contentService.getAllContentAdmin();

    return res.status(200).json(
        new ApiResponse(
            200,
            "All content fetched successfully",
            result,
            {
                count: result.length,
            }
        )
    );
});



module.exports = {
    checkDuplicate,
    ingestContent,
    getFeed,
    getContentById,
    searchContent,
    getPendingContent,
    getAllContentAdmin,
};