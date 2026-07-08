const ApiResponse = require("../../../utils/ApiResponse");
const asyncHandler = require("../../../utils/asyncHandler");
const contentService = require("../services/content.service");

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


const getFeed = asyncHandler(async (req, res) => {

    const { cursor, limit } = req.query;

    const result = await contentService.getFeed(
        cursor,
        limit
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Content feed fetched successfully",
            result
        )
    );

});


const getContentBySlug = asyncHandler(async (req, res) => {

    const result = await contentService.getContentBySlug(req.params.slug);

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

const getHero = asyncHandler(async (req, res) => {

    const result = await contentService.getHero();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Hero content fetched successfully",
            result
        )
    );

});

const getPrerequisites = asyncHandler(async (req, res) => {

    const result =
        await contentService.getPrerequisites(
            req.params.slug
        );

    return res.status(200).json(

        new ApiResponse(
            200,
            "Prerequisites fetched successfully",
            result
        )

    );

});

module.exports = {
    checkDuplicate,
    getFeed,
    getContentBySlug,
    searchContent,
    getPendingContent,
    getAllContentAdmin,
    getHero,
    getPrerequisites,
};