"use client";
import {useRouter} from "next/navigation";
import {useContext, useEffect} from "react";
import userContext from "@/contexts/user/userContext";
export default function ProfilePage(){
    const router = useRouter();
    const {user} = useContext(userContext);
    useEffect(() => {
        if(!user){
            router.push("/login");
        }
    }, [user]);

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

    

    return <>

    {
        !user ? <div className="flex flex-col items-center justify-center h-screen gap-6">Loading...</div>
        :
        <div className="flex flex-col items-center justify-center h-screen gap-6">

            ProfilePage
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded w-1/6">
                Logout
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded w-1/6">
                Verify Email
            </button>
        </div>
    }
    </>
}