import {NextRequest} from "next/server";
import jsonwebtoken from "jsonwebtoken";
import User from "@/models/User";
export  async function checkUserAuthentication(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
        return { isAuthenticated: false, message: "Unauthorized" };
    }
    const data = jsonwebtoken.verify(token, process.env.SECRET_KEY as string);
    if(!data || (data as { userId: string }).userId === undefined){
        return { isAuthenticated: false, message: "Unauthorized" };
    }
    const user = await User.findById((data as { userId: string }).userId);
    if (!user) {
        return { isAuthenticated: false, message: "Unauthorized" };
    }
    return { isAuthenticated: true, message: "Authorized", user };
}