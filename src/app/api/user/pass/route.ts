import { NextRequest, NextResponse } from "next/server";
import { checkUserAuthentication } from "@/utils/utils";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function GET(request:NextRequest){
    const response = await checkUserAuthentication(request);
    if(!response.isAuthenticated){
        return NextResponse.json({message: response.message},{status:401});
    }
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const user = response.user;
    const token = crypto.randomBytes(32).toString("hex");
    user.forgotPasswordToken = token;
    user.forgotPasswordExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();
    const link = "http://localhost:3000/pass/" + token;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user?.email,
        subject: "Password Reset Request",
        text: `Hello ${user?.name},\n\nPlease change your password by clicking the following link:\n\n${link}\n\nThank you!`
    };
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({message: "Email sent for password reset"}), {status: 200});


}