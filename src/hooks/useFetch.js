import { useAuthContext } from "./useAuthContext"
const API_URL = import.meta.env.VITE_API_URL;

// import { useAuthContext } from "./useAuthContext"
export function useFetch(url,options={},content_type="application/json"){
    const {user} = useAuthContext();

    const handleFetch = async (url,options={},content_type=true) =>{
        // console.log("INSIDE ARE: ",options);
        // console.log("content type is: ",content_type)
        // console.log("URL IS",API_URL+url)

        const response = await fetch(API_URL+url,{
                headers:{
                    ...(content_type?{"Content-Type":'application/json'}:{}), 

                    //if there is a content type we set it to null
                    //if there is no content type
                    ...(user? {"Authorization":`Bearer ${user.token}`}:{})
                },
                mode:"cors",
                ...options
            }
        )
        const data = await response.json()
        // console.log("The data response IS:",data);
        if (response.ok) return data;
        if (response.status==401 && data.error=='TokenExpiredError'){
            throw new Error("Token has expired. Please login again")
        } else{
            console.log("$err",data);
            throw new Error(data.error || "Failed to fetch data")
        }
    }

    return handleFetch; //returns a function // useFetch is aHigher order function


}

//TODO , make fetching more convinient so that you dont need to pass in user to myFetch.jsx