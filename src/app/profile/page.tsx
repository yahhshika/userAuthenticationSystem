"use client";
import {useRouter} from "next/navigation";
import {useContext, useEffect} from "react";
import userContext from "@/contexts/user/userContext";
import axios, {isAxiosError} from "axios";

export default function ProfilePage(){
    const router = useRouter();
    const {user, setUser} = useContext(userContext);
    useEffect(()=>{

        const fetchUserData = async() => {
     
            const response =await axios.get("/api/user/auth");

            if(response.data?.user){
                setUser(response.data.user);
            }else{
                router.push("/login");
            }
            
        }
        fetchUserData().catch((error)=>{
            if(isAxiosError(error)){
                console.log("axios error in profile page:", error.response?.data.message || error.message);
                router.push("/login");
                return;
            }
            console.error("Error fetching user data:", error);
            router.push("/login");
        })
    },[]);


    const handleLogout = async() => {
        try{
            const response = await fetch("/api/user/logout");
            if(response.ok){
                router.push("/login");
            }
        }catch(error){
            console.error("Error logging out:", error);
        }
    };

    const handleVerifyEmail = async() => {
        try{
            const response = await axios.get("/api/user/verify-email");
            if(response.data?.message){
                console.log(response.data.message);
            }

        }catch(error){
            if(isAxiosError(error)){
                console.log("axios error in verify email:", error.response?.data.message || error.message);
                console.log(error.response);
                return;
            }
            console.error("Error in verify email");

        }

    }

    

    return <>

    {
        !user ? <div className="flex flex-col items-center justify-center h-screen gap-6">Loading...</div>
        :
        <div className="flex flex-col items-center justify-center h-screen gap-6">

            Welcome, {user?.name} <br />
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded w-1/6">
                Logout
            </button>
            {!(user?.isVerified) &&
            <button onClick={handleVerifyEmail} className="bg-green-500 text-white px-4 py-2 rounded w-1/6">
                Verify Email
            </button>
            }
        </div>
    }
    </>
}