const { registerSchema } = require("./auth.validation");
const authService = require("./auth.service");
const { loginSchema } = require("./auth.validation");
const { success } = require("zod");

const register = async (req, res) => {
    try {
        const validateData = registerSchema.parse(req.body);
        const user = await authService.registerUser(validateData);

        return res.status(201).json({
            success: true,
            message: "User register succefully",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const login = async (req, res) => {
    try {
        const validateData = loginSchema.parse(req.body);
        const result = await authService.loginUser(validateData);

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            data: result,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


const getProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.user,
    });
};


module.exports = {
    register,
    login,
    getProfile,
};
