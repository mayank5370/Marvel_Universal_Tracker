const authService = require("./auth.service");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");


const register = asyncHandler(async (req, res) => {

    const user = await authService.register(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            user
        )
    );

});


const login = asyncHandler(async (req, res) => {

    const result = await authService.login(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login successful",
            result
        )
    );

});


const getProfile = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched successfully",
            req.user
        )
    );

});


module.exports = {
    register,
    login,
    getProfile,
};
