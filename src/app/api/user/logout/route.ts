import {NextResponse, NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    try{
        const response = NextResponse.json({message: "Logout successful"}, {status: 200});
        response.cookies.delete("token");
        return response;
    }catch(error:any){
        console.log("Error in logout route");
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}