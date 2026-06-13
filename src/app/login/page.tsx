'use client'
import { useState } from "react";

export default function LoginPage() {
    let [credentails, setCredentials] = useState({
        email: "",
        password: "",
    });
    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev=>{
            return  { ...prev, [e.target.name]: e.target.value }
        });
    }
    let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(credentails);
        setCredentials({
            email: "",
            password: "",
        });
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