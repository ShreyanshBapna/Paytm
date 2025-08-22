import mongoose, { Schema } from "mongoose";

import dotenv from "dotenv";
import { required } from "zod/mini";
dotenv.config();

async function connect(){
    if(process.env.MongodbURL){
        await mongoose.connect(process.env.MongodbURL)
    }
}

connect();

// User Schema
const UserSchema = new Schema ({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
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

// Transaction Schemas
const TransactionSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Account Schema
const accountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    balance: {
        type: Number,
        default: 0,
    }
});



export const accountModel = mongoose.model('Account', accountSchema);
export const transactionModel = mongoose.model('Transaction', TransactionSchema);
export const userModel = mongoose.model('User', UserSchema);



