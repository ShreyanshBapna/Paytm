import express, { Request, Response } from "express"
import { authMiddleware } from "../middleware";
import mongoose from "mongoose";
import { accountModel, transactionModel, userModel } from "../db";

const accountRouter = express.Router();

accountRouter.post("/create", authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;

    // check if account already exists
    const account = await accountModel.findOne({ userId });

    if(account){
        return res.status(400).json({
            message: "Account already exists"
        });
    }

    try {
        const response = await accountModel.create({
            userId,
            balance: (Math.random() * 10000000)
        });

        return res.status(201).json({
            message: "Account created successfully",
            data: response
        })

    } catch(e) {
        return res.status(500).json({
            message : "something is wrong"
        });
    }
});


accountRouter.post("/transactions", authMiddleware, async (req: Request, res: Response) => {
    const {amount, to} = req.body;
    //@ts-ignore
    const from = req.userId;
    const session = await mongoose.startSession()
    try{
        
        session.startTransaction();

        const fromAccount = await accountModel.findOne({ userId: from }).session(session);
        const toAccount = await accountModel.findOne({ userId: to }).session(session);

        if(!fromAccount || !toAccount){
            return res.status(404).json({
                message: "Account not found"
            });
        }

        if(fromAccount.balance < amount){
            return res.status(400).json({
                message: "Insufficient Balance"
            });
        }

        const transactions = await transactionModel.create({
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
        })

    } catch(e) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();

        return res.status(500).json({
            message: "Something went wrong",
            error: e
        })

    } finally {
        session.endSession();
    }

})

export default accountRouter;