"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/auth/signup", async (req, res) => {
    const { username, password, email } = req.body;
    const hashPassowrd = await bcrypt_1.default.hash(password, 7);
    try {
        const response = await db_1.userModel.create({
            username,
            password: hashPassowrd,
            email
        });
    }
    catch (e) {
        res.json({
            message: "something is wrong"
        });
        return;
    }
    res.json({
        msg: "signup sccuessfully!!"
    });
    return;
});
app.post("/api/auth/signin", async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await db_1.userModel.findOne({
            email
        });
        if (user) {
            const realPassword = await bcrypt_1.default.compare(password, user?.password);
            if (realPassword) {
                const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET);
                res.json({
                    token
                });
                return;
            }
            else {
                res.json({
                    message: "Incorrect Password"
                });
            }
        }
        else {
            res.json({
                message: "Incorrect Email"
            });
        }
    }
    catch (e) {
        res.json({
            message: "Something went wrong",
            error: e
        });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map