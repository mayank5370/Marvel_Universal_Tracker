const adminService = require("./dashboard.service");

const getDashboardStats = async(req, res, next) => {
    try{
        const result = await adminService.getDashboardStats();

        return res.status(200).json({
            success: true,
            data: result,
        });
    }catch (error){
        next(error);    
    }
};

module.exports = {
    getDashboardStats,
};
