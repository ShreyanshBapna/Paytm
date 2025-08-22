"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../db");
const accountRouter = express_1.default.Router();
accountRouter.post("/create", middleware_1.authMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    // check if account already exists
    const account = await db_1.accountModel.findOne({ userId });
    if (account) {
        return res.status(400).json({
            message: "Account already exists"
        });
    }
    try {
        const response = await db_1.accountModel.create({
            userId,
            balance: (Math.random() * 10000)
        });
        return res.status(201).json({
            message: "Account created successfully",
            data: response
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "something is wrong"
        });
    }
});
accountRouter.post("/transactions", middleware_1.authMiddleware, async (req, res) => {
    const { amount, to } = req.body;
    //@ts-ignore
    const from = req.userId;
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const fromAccount = await db_1.accountModel.findOne({ userId: from }).session(session);
        const toAccount = await db_1.accountModel.findOne({ userId: to }).session(session);
        if (!fromAccount || !toAccount) {
            return res.status(404).json({
                message: "Account not found"
            });
        }
        if (fromAccount.balance < amount) {
            return res.status(400).json({
                message: "Insufficient Balance"
            });
        }
        const transactions = await db_1.transactionModel.create({
            from,
            to,
            amount
        });
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        (await fromAccount.save({ session }));
        (await toAccount.save({ session }));
        // Commit the transaction
        await session.commitTransaction();
        return res.status(200).json({
            message: "Transaction Successful",
            data: {
                from: fromAccount,
                to: toAccount
            }
        });
    }
    catch (e) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();
        return res.status(500).json({
            message: "Something went wrong",
            error: e
        });
    }
    finally {
        session.endSession();
    }
});
exports.default = accountRouter;
//# sourceMappingURL=account.js.map