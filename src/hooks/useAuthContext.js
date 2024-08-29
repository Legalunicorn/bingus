import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export const useAuthContext = () =>{
    const context = useContext(AuthContext);
    if (!context) throw Error("Auth context accessed outside of scope");
    return context;
}