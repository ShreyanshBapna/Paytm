import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    // check if the token is present or not
    if(!token){
        return res.json({
            message: "Token is required"
        });
    }
    
    // check if the token is valid or not
    try{
        // verify the token
        const decode = jwt.verify(token as string, process.env.JWT_SECRET!);
        
        if(decode){
            // @ts-ignore
            req.userId = decode.id;
        }
        else {
            return res.json({
                message: "Invalid Token"
            });
        }
    } catch(e) {
        return res.json({
            message: "Something Went Wrong",
            error : e
        })
    }
    next();
}
