import express, { Request, Response } from "express"
import { userModel } from "./db";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.post("/api/auth/signup", async (req: Request, res : Response) => {
    const { username, password, email } = req.body;
    const hashPassowrd = await bcrypt.hash(password, 7);

    try {
        const response = await userModel.create({
            username,
            password: hashPassowrd,
            email
        })
    } catch (e) {
        res.json({
            message : "something is wrong"
        })
        return;
    }

    res.json({
        msg: "signup sccuessfully!!"
    })
    return;
})

app.post("/api/auth/signin", async (req: Request, res : Response) => {
    const { password, email } = req.body;
    
    try{
        const user = await userModel.findOne({
            email
        }) 
        if(user){
            const realPassword = await bcrypt.compare(password, user?.password!);

            if(realPassword){
                const token = jwt.sign({ email }, process.env.JWT_SECRET!);
                res.json({
                    token
                })
                return;
            } 
            else {
                res.json({
                    message: "Incorrect Password"
                })
            }
        }
        else {
            res.json({
                message: "Incorrect Email"
            })
        }
    } catch(e) {
        res.json({
            message: "Something went wrong",
            error: e
        })
    }
    
    
})

app.listen(3000);
