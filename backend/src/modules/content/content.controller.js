const contentService = require("./content.service");

const ingestContent = async (req, res, next) => {
    try {
        const result = await contentService.createContent(
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Content Ingested",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

const getFeed = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const result = await contentService.getFeed(
            page,
            limit
        );

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

const getContentById = async (req, res, next) => {
    try {
        const result = await contentService.getContentById(
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

const searchContent = async (req, res, next) => {
    try {
        const {
            q,
            type,
            spoilerRisk,
            sort,
        } = req.query;

        const result = await contentService.searchContent({
            q,
            type,
            spoilerRisk,
            sort,
        });


        return res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });

    } catch (error) {
        next(error);
    }


};

const approveContent = async (req, res, next) => {
    try {
        const result = await contentService.approveContent(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Content Approved",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

const rejectContent = async (req, res, next) => {
    try {
        const result = await contentService.rejectContent(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Content Rejected",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

const getPendingContent = async (req, res, next) => {
    try {

        const result =
            await contentService.getPendingContent();

        return res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

const getAllContentAdmin = async (req, res, next) => {
    try {

        const result =
            await contentService.getAllContentAdmin();

        return res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    ingestContent,
    getFeed,
    getContentById,
    searchContent,
    approveContent,
    rejectContent,
    getPendingContent,
    getAllContentAdmin,
};