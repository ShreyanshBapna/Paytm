import mongoose, { Schema } from "mongoose";

import dotenv from "dotenv";
dotenv.config();

async function connect(){
    if(process.env.MongodbURL){
        await mongoose.connect(process.env.MongodbURL)
    }
}

connect();

const UserSchema = new Schema ({
    username: String,
    password: String,
    email : String
});

export const userModel = mongoose.model('User', UserSchema);


