import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
connectDB();
export async function GET(request: NextRequest,{params}:{params:Promise<{token:string}>}){
    try{
        const token = (await params).token;
        const user = await User.findOne({verificationToken:token, verificationTokenExpiry:{$gt: Date.now()}});
        if(user){
            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiry = undefined;
            await user.save();
            return NextResponse.json({message:"Email Verification successfull"}, {status:200});
        }
        return NextResponse.json({message:"Email Verification failed, try again!"}, {status: 401});

    }catch(error){
        return NextResponse.json({message: "error in verification"}, {status: 400});
    }

}