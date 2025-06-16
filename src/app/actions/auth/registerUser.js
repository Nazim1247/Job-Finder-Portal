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
        const insertedId = result.insertedId.toString();
        // const {insertedId}= result;
        return {success: true, message: "User registered successfully", userId: insertedId,};
    }
    return {success: false, message: "User already exists",};
};
export default registerUser;