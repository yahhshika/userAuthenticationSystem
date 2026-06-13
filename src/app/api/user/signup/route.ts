import {NextResponse, NextRequest} from "next/server";
import User from "@/models/User";
import connectDB from "@/dbConfig/dbConfig";
connectDB();
export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);
    return NextResponse.json({message: "User signed up successfully"});
}