import express, { Request, Response } from "express"
import { userModel } from "../db";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import zod, { email } from "zod";

import dotenv from "dotenv";
import { authMiddleware } from "../middleware";
dotenv.config();

const userRouter = express.Router();

const signupSchema = zod.object({
    username : zod.string().min(5), 
    password : zod.string().regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
    email : zod.string().email(),
})

userRouter.post("/signup", async (req: Request, res : Response) => {
    const { username, password, email } = req.body;

    // check if the req.body is valid or not
    const {success} = signupSchema.safeParse(req.body);
    
    if(success){
        // check if user already exists with the email or not
        const user = await userModel.findOne({
            email
        })

        if(user){
            return res.json({
                message: "User already exists"
            })
        }
        // hash the password
        const hashPassowrd = await bcrypt.hash(password, 7);

        try {
            // create the user
            const response = await userModel.create({
                username,
                password: hashPassowrd,
                email
            })
            return res.status(201).json({
                msg: "signup sccuessfully!!"
            })
            
        } catch (e) {
            return res.status(500).json({
                message : "something is wrong"
            });
        }
    } else {
        res.status(401).json({
            message : "invalid credential!!",
            error : signupSchema.safeParse(req.body).error
        })
    }
})

userRouter.post("/signin", async (req: Request, res : Response) => {
    const { password, email } = req.body;
    
    try{
        // find the user with the email
        const user = await userModel.findOne({
            email
        }) 
        if(user){
            // compare the password
            const realPassword = await bcrypt.compare(password, user?.password!);

            if(realPassword){
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
                return res.json({
                    token
                });
            } 
            else {
                return res.status(401).json({
                    message: "Incorrect Password"
                })
            }
        }
        else {
            res.status(401).json({
                message: "Incorrect Email"
            })
        }
    } catch(e) {
        res.status(500).json({
            message: "Something went wrong",
            error: e
        })
    }
})

const updateBody = zod.object({
    email: zod.string().optional(),
    username: zod.string().optional(),
    password: zod.string().optional()
})

userRouter.put("/update", authMiddleware, async (req: Request, res: Response) => {
    const { success } = updateBody.safeParse(req.body);
    // @ts-ignore
    const userId = req.userId;
    
    try {
        if(success){
            const user = await userModel.updateOne({_id: userId}, req.body);
            return res.json({
                message: "User updated Successfully"
            });
        } else {
            return res.json({
                message: "Invalid Credentail!!"
            })
        }
    } catch(e) {
        return res.status(500).json({
            message: "Something went wrong",
            error: e
        })
    }
})


export default userRouter;
