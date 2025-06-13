"use server"

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const registerUser = async (payload) => {
    // console.log(payload)

    const userCollection = dbConnect(collectionNameObj.userCollection);
    // validation
    const {email,password} = payload;
    if(!email || !password) return {success: false};
    const user = await userCollection.findOne({email: payload.email})
    if(!user){
        const hashedPassword = await bcrypt.hash(password,10)
        payload.password = hashedPassword
        const result = await userCollection.insertOne(payload);
        const {_id}= result;
        return {_id};
    }
    return {success: false};
};
export default registerUser;