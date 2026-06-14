const {registerSchema} = require("./auth.validation");
const authService = require("./auth.service");
const { success } = require("zod");

const register = async(req, res) => {
    try {
        const validateData = registerSchema.parse(req.body);
        const user = await authService.registerUser(validateData);

        return res.status(201).json({
            success: true,
            message: "User register succefully",
            data: user,
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    register,
};
