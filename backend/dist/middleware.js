"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const { token } = req.headers;
    // check if the token is present or not
    if (!token) {
        return res.json({
            message: "Token is required"
        });
    }
    // check if the token is valid or not
    try {
        // verify the token
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decode) {
            // @ts-ignore
            req.userId = decode.id;
        }
        else {
            return res.json({
                message: "Invalid Token"
            });
        }
    }
    catch (e) {
        return res.json({
            message: "Something Went Wrong",
            error: e
        });
    }
    next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=middleware.js.map