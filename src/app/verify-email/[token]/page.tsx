"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios, {isAxiosError} from "axios";
export default function VerifyEmailPage() {
    const params = useParams();
    const token = params.token;
    let [hasVerified, setHasVerified] = useState(false);

    useEffect(()=>{
        const emailVefification = async()=>{
            const response = await axios.get(`/api/user/verify-email/${token}`);
            if(response.status === 200){

                console.log(response.data?.message);
                setHasVerified(true);
            }
        }
    
        emailVefification().catch((error)=>{
            if(isAxiosError(error)){
                console.log("axios error is email verification :"+ error.response?.data);
                return;
            }
            console.log("error in email verification frontend");
         
        })

    },[])


    
    return (<>
        <h1 className="text-2xl font-bold text-center mt-10">Verifying Email: </h1>
        {hasVerified && "congratulation! you're email got verified"};
    </>);
}