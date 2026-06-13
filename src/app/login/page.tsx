'use client'
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import {useRouter} from "next/navigation";
import { useContext } from "react";
import userContext from "@/contexts/user/userContext";
export default function LoginPage() {
    const router = useRouter();
    const { setUser } = useContext(userContext);

    let [credentails, setCredentials] = useState({
        email: "",
        password: "",
    });
    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev=>{
            return  { ...prev, [e.target.name]: e.target.value }
        });
    }
    let onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      try{

        e.preventDefault();
        console.log(credentails);
        const localCreds = credentails; 
        setCredentials({
            email: "",
            password: "",
        });
        const reponse = await axios.post("/api/user/login", localCreds);
        console.log(reponse);
        if(reponse.data?.user){
          setUser(reponse.data.user);
        }
        router.push("/profile");
      }catch(error:any){
        if(isAxiosError(error)){
          console.log(error.response?.data?.message || error.message);
          return;
        }else{
          console.log("Error occurred while logging in user, in catch block");
        }
      }

    }
  return (<>
    <h1 className="text-2xl font-bold text-center mt-10">Login Page</h1>
    <form action="" className="flex flex-col gap-4 w-1/3 mx-auto mt-10" onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={credentails.email}
        onChange={handleChange}
        name="email"
      className="border border-gray-300 rounded px-4 py-2"
      /> <br />
      <input
        type="password"
        placeholder="Password"
        value={credentails.password}
        onChange={handleChange}
        name="password"
      className="border border-gray-300 rounded px-4 py-2"
      /> <br />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  </>
  );
}