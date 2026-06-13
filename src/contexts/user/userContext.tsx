"use client";
import { createContext } from "react";

type UserContextType = {
    user: any;
    setUser: any;
};

const userContext = createContext<UserContextType >({user: null, setUser: null});

export default userContext;