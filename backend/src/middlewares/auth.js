const { success } = require("zod");
const jwtUtils = require("../utils/jwt");



const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization Format",
      });
    }

    const token = authorization.substring(7).trim();

    const decoded =
      jwtUtils.verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// const auth = (req, res, next) => {
//     try{
//         const authorization = req.headers.authorization;

//         if(!authorization){
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized",
//             });
//         }

//         const tokem = authorization.split(" ")[1];
//         const decoded = jwtUtils.verifyAccessToken(token);

//         req.user = decoded;

//         next();
//     }catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid Token",
//         });
//     }
// };



// const auth = (req, res, next) => {
//   try {
//     const authorization = req.headers.authorization;

//     console.log("Authorization:", authorization);

//     const token = authorization.split(" ")[1];

//     console.log("Token:", token);

//     const decoded = jwtUtils.verifyAccessToken(token);

//     console.log("Decoded:", decoded);

//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log(error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid Token",
//     });
//   }
// };


module.exports = auth;