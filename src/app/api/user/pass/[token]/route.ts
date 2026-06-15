import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";
connectDB();
export async function POST(request:NextRequest,{params}:{params: Promise<{token:string}>}){
    try{
        const token = (await params).token;
        const existingUser = await User.findOne({forgotPasswordToken:token, forgotPasswordExpiry:{$gt: Date.now()}});
        if(!existingUser){
            return NextResponse.json({message:"Invalid or expired token"}, {status:400});
        }
        const newPass = (await request.json()).password;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPass, salt);
        existingUser.password = hashedPassword;
        existingUser.forgotPasswordToken = undefined;
        existingUser.forgotPasswordExpiry = undefined;
        await existingUser.save();
        return NextResponse.json({message:"Password reset successful"},{status:200});

    }catch(error){
        return NextResponse.json({message:"internal server error in changing the password"},{status:500});
    }
}