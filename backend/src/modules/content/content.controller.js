const { success } = require("zod");
const contentService = require("./content.service");

const ingestContent = async(req, res, next) => {
    try {
        const result = await contentService.createContent(
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Content Ingested",
            data: result,
        });
    
    }catch (error){
        next(error);
    }
};

module.exports = {
    ingestContent,
};