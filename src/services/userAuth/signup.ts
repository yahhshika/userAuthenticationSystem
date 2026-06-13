import {NextResponse, NextRequest} from 'next/server';

import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function helperSignUp(request: NextRequest) {
    const body = await request.json();
    const {name, email, password} = body;

    const existingUser = await User.findOne({email: email});
    if(existingUser){
        return NextResponse.json({message: "User already exists"}, {status: 400});
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    const finalUser = await user.save();
    let userObj = finalUser.toObject();
    let {password: _, ...userWithoutPassword} = userObj;

    // token generation 
    const data ={
        userId: userWithoutPassword._id
    }
    const token = jsonwebtoken.sign(data, process.env.SECRET_KEY as string);
    
    // console.log(body);
    let response =  NextResponse.json({message: "User signed up successfully", user: userWithoutPassword, token: token});
    response.cookies.set("token", token, {httpOnly: true, maxAge: 60*60*24*7});
    return response;
}
