const { success } = require("zod");
const moderationService = require("./moderation.service");

const getPendingContent = async (req, res, next) => {
    try {
        const result = await moderationService.getPendingContent();

        return res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

const getContentDetails = async (req, res, next) => {
    try {

        const result = await moderationService.getContentDetails(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPendingContent,
    getContentDetails,
};