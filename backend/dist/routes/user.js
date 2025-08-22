"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("../middleware");
dotenv_1.default.config();
const userRouter = express_1.default.Router();
const signupSchema = zod_1.default.object({
    firstname: zod_1.default.string().min(5).trim(),
    lastname: zod_1.default.string().max(20).trim(),
    password: zod_1.default.string().regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
    email: zod_1.default.string().email(),
});
// signup route
userRouter.post("/signup", async (req, res) => {
    const { firstname, lastname, password, email } = req.body;
    // check if the req.body is valid or not
    const { success } = signupSchema.safeParse(req.body);
    if (success) {
        // check if user already exists with the email or not
        const user = await db_1.userModel.findOne({
            email
        });
        if (user) {
            return res.json({
                message: "User already exists with this email id"
            });
        }
        // hash the password
        const hashPassowrd = await bcrypt_1.default.hash(password, 7);
        try {
            // create the user
            const response = await db_1.userModel.create({
                firstname,
                lastname,
                password: hashPassowrd,
                email
            });
            return res.status(201).json({
                msg: "signup sccuessfully!!"
            });
        }
        catch (e) {
            return res.status(500).json({
                message: "something is wrong"
            });
        }
    }
    else {
        res.status(401).json({
            message: "invalid credential!!",
            error: signupSchema.safeParse(req.body).error
        });
    }
});
// signin route
userRouter.post("/signin", async (req, res) => {
    const { password, email } = req.body;
    try {
        // find the user with the email
        const user = await db_1.userModel.findOne({
            email
        });
        if (user) {
            // compare the password
            const realPassword = await bcrypt_1.default.compare(password, user?.password);
            if (realPassword) {
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
                return res.json({
                    token
                });
            }
            else {
                return res.status(401).json({
                    message: "Incorrect Password"
                });
            }
        }
        else {
            res.status(401).json({
                message: "Incorrect Email"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Something went wrong",
            error: e
        });
    }
});
const updateBody = zod_1.default.object({
    email: zod_1.default.string().optional(),
    username: zod_1.default.string().optional(),
    password: zod_1.default.string().optional()
});
// update user details
userRouter.put("/update", middleware_1.authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    // @ts-ignore
    const userId = req.userId;
    try {
        if (success) {
            const user = await db_1.userModel.updateOne({ _id: userId }, req.body);
            return res.json({
                message: "User updated Successfully"
            });
        }
        else {
            return res.json({
                message: "Invalid Credentail!!"
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
            error: e
        });
    }
});
// search users
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await db_1.userModel.find({
        $or: [
            { firstname: { $regex: filter, $options: "i" } },
            { lastname: { $regex: filter, $options: "i" } }
        ]
    });
    if (JSON.stringify(users) === JSON.stringify([])) {
        return res.json({
            message: "No user found"
        });
    }
    else {
        return res.json({
            users: users.map((user) => {
                return {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                };
            })
        });
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map