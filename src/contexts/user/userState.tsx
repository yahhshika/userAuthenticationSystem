"use client";
import userContext from "./userContext";
import { useState, ReactNode } from "react";

interface UserStateProps {
    children: ReactNode;
}

export default function UserState({children}: UserStateProps) {
    const [user, setUser] = useState(null);

    return <userContext.Provider value={{user, setUser}}>
        {children}
    </userContext.Provider>
}