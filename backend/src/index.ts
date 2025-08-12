import express, { Request, Response } from "express"


const app = express();

app.post("/api/auth/signup", (req: Request, res : Response) => {
    res.json({
        msg: "hello"
    })
    return;
})

app.listen(3000);
