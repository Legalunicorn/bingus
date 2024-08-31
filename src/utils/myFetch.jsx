//handles JWT and error 
const API_URL = import.meta.env.VITE_API_URL
import { useAuthContext } from "../hooks/useAuthContext"


/**
 * 
 * @param {*} url the path to the API after /api/
 * @param {*} options for request method and other options not here
 * @param {*} content_type for the content type, forms with image should be multipart data
 * @returns 
 */
export const customFetch = async(url,options,content_type="application/json")=>{
    const {user} = useAuthContext();
    const headers = {
        "Content-Type": content_type, // This is set in both cases
        ...(user ? { "Authorization": `Bearer ${user.token}` } : {}) // Conditionally include Authorization header
      };
    
    const response = await fetch(API_URL+url,
        {
            headers,
            mode:"cors",
            ...options //for more options if i have them like method
        }
    )
    if (response.ok) return response; //no errors
    const data = await response.json();
    if (response.status==401 && data.msg=='TokenExpiredError'){
        throw new Error("Token has expired. Please login again.")
    } else {
        throw new Error(data.error.msg || data.error.message || 'Failied to fetch data')
    }

}