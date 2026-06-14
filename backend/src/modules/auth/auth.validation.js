const {z} = require("zod");
const registerSchema = z.object({
     email: z.string().email("Invalid email address"),
     password: z
     .string()
     .min(6, "Password must be atleast 6 charachter")
     .max(20)
});

module.exports = {
    registerSchema,
};
