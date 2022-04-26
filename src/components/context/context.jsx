import { createContext } from "react";
import { useState } from "react";
const TokenContext = createContext();

const ContextProvider = ({children})=>{
    const [token, setToken] = useState("initial token");

    const set =(value)=>{
        setToken(value);
    }
    return <TokenContext.Provider value={{token, set}}>
        {children}
    </TokenContext.Provider> 
}

export {TokenContext, ContextProvider}