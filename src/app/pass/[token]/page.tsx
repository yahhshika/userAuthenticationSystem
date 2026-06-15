"use client";
import { useParams } from "next/navigation";
import axios,{isAxiosError} from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function VerifyPass(){
    const router = useRouter();
    const params = useParams();
    const token = params.token;
    const [password, setPassword] = useState("");

    const onSubmit = async(event: React.FormEvent<HTMLFormElement>)=>{
        try{
            event.preventDefault();
            const response = await axios.post(`/api/user/pass/${token}`,{password});
            console.log(response);
            router.push("/profile");
        }catch(error:any){
            if(isAxiosError(error)){
                console.log("axios error in changing the password: ", error.response?.data?.message || error.message);
            }else{
                console.log("error in changing the password");
            }
        }
        
    }

    return<>
    <form action="" className="flex flex-col gap-4 w-1/3 mx-auto mt-10" onSubmit={onSubmit}>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        name="password"
      className="border border-gray-300 rounded px-4 py-2"
      /> <br />
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Change Password
      </button>
    </form>
    </>


}