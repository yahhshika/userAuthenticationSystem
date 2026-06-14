import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import connectDB from "@/dbConfig/dbConfig";
connectDB();
export async function GET(request:NextRequest) {
    try{

        const token = request.cookies.get("token")?.value;
        if (!token) {        
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const data = jsonwebtoken.verify(token,process.env.SECRET_KEY as string);
        if(!data || (data as { userId: string }).userId === undefined){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userFound = await User.findById((data as { userId: string }).userId);
        if(!userFound){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user: userFound }, { status: 200 });
    
    }catch(error:any){
        console.log("Error in auth route");
        return NextResponse.json({message: "Internal server error in user authentication"}, {status: 500});
    }
}