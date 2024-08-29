import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export const ProtectedRoute = ({children})=>{
    const {loading,user} = useAuthContext();
    return loading ?(
        <p>Loading</p>
    ) : user ?{
        children
    } : (
        <Navigate to="/login"/>
    )
}