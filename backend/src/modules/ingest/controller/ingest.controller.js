const ingestService = require("../services/ingest.service");

console.log("REAL INGEST CONTROLLER LOADED");

const ingest = async (req, res, next) => {

    try {

        console.log("Controller Started");

        const result = await ingestService.ingest(req.body);

        console.log("Service Returned");

        return res.status(201).json({
            success: true,
            message: "Content ingested successfully",
            data: result,
        });

    } catch (error) {

        console.log("Controller Error");
        console.log(error);

        next(error);

    }

};

module.exports = {
    ingest,
};