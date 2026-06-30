const { success } = require("zod");
const sourceService = require("./source.service");


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

const createSource = async (req, res, next) => {
    try {
        const result = await sourceService.createSource(req.body);

        return res.status(201).json({
            success: true,
            message: "Source created successfully",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

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
}

module.exports = {
    getAllSources,
    createSource,
    updatedSource,
    toggleSource,
};