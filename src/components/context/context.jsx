import { createContext } from "react";
import { useState } from "react";
const TokenContext = createContext();

const ContextProvider = ({children})=>{
    const [token, setToken] = useState("initial token");
    return <TokenContext.Provider value={{token, setToken}}>
        {children}
    </TokenContext.Provider> 
}

export {TokenContext, ContextProvider}