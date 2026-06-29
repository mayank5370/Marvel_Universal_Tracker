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

module.exports = {
    getAllSources,
};