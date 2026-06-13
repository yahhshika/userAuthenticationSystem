import {NextResponse, NextRequest} from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import { helperSignUp } from "@/services/userAuth/signup";
connectDB();


export async function POST(request: NextRequest) {
    try{

        let response = await helperSignUp(request);
        return response;

    } catch (error:any) {
        console.log("Error in signup route");
        // console.log(error);
        return NextResponse.json({message: "Error occurred while signing up user"}, {status: 500});
    }
}