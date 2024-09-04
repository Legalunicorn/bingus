import { useAuthContext } from "./useAuthContext"
const API_URL = import.meta.env.VITE_API_URL;

// import { useAuthContext } from "./useAuthContext"
export function useFetch(url,options={},content_type="application/json"){
    const {user} = useAuthContext();
    const handleFetch = async () =>{
        const response = await fetch(API_URL+url,
            {
                headers:{
                    ...(content_type?{"Content-Type":content_type}:{}),
                    ...(user? {"Authorization":`Bearer ${user.token}`}:{})
                },
                mode:"cors",
                ...options
            }
        )
        const data = await response.json()
        if (response.ok) return data;
        if (response.status==401 && data.error=='TokenExpiredError'){
            throw new Error("Token has expired. Please login again")
        } else{
            console.log("$err",data);
            throw new Error(data.error || "Failed to fetch data")
        }
    }

    return handleFetch;


}

//TODO , make fetching more convinient so that you dont need to pass in user to myFetch.jsx