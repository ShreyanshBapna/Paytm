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
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
});

export const userModel = mongoose.model('User', UserSchema);


