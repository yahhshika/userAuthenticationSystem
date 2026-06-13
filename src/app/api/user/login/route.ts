import {NextResponse, NextRequest} from "next/server";
import User from "@/models/User";
import connectDB from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
connectDB();
export async function POST(request: NextRequest) {
    try{

        const body = await request.json();
        const {email, password} = body;
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        const isMatch = bcrypt.compareSync(password, existingUser.password);
        if(!isMatch){
            return NextResponse.json({message: "Invalid credentials"}, {status: 400});
        }
        const data = {
            userId: existingUser._id
        }
        const token = jsonwebtoken.sign(data, process.env.SECRET_KEY as string);
        const reponse =  NextResponse.json({ message: "Login successful", token, user: existingUser }, { status: 200 });
        reponse.cookies.set("token", token, {httpOnly: true, maxAge: 60*60*24*7});
        return reponse;

    }catch(error:any){
        console.log("Error in login route");
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }

}