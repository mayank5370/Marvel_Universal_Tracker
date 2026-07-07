const ingestService = require("../services/ingest.service");

const ingest = async (req, res, next) => {

    try {
        const result = await ingestService.ingest(req.body);

        return res.status(201).json({
            success: true,
            message: "Content ingested successfully",
            data: result,
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    ingest,
};