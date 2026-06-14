import nodemailer from "nodemailer";
import {NextRequest} from "next/server";
import {checkUserAuthentication} from "@/utils/utils";
import connectDB from "@/dbConfig/dbConfig";
import crypto from "crypto";
connectDB();
export async function GET(request: NextRequest) {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const response = await checkUserAuthentication(request as any);
        if(!response.isAuthenticated){
            return new Response(JSON.stringify({message: response.message}), {status: 401});
        }
        
        const user = response.user;
        const token = crypto.randomBytes(32).toString("hex");
        user.verificationToken = token;
        user.verificationTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();
        const link = "http://localhost:3000/verify-email/" + token;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user?.email,
            subject: "Email Verification",
            text: `Hello ${user?.name},\n\nPlease verify your email by clicking the following link:\n\n${link}\n\nThank you!`
        };
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({message: "Verification email sent successfully"}), {status: 200});

    }catch(error){
        console.log("Error in verify email route");
        return new Response(JSON.stringify({message: "Internal server error in verify email route"}), {status: 500});
    }
}