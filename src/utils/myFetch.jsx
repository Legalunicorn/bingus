import { useAuthContext } from "../hooks/useAuthContext";

//handles JWT and error 
const API_URL = import.meta.env.VITE_API_URL


/**
 * 
 * @param {*} url the path to the API after /api/
 * @param {*} options for request method and other options not here
 * @param {*} content_type for the content type, forms with image should be multipart data
 * @returns 
 */

//Cannot use useContext inside a function like this. thus im passing in the user
export const  myFetch= async (url,options={},user={},content_type="application/json")=>{

    // console.log("user sent was",user)
    console.log("OPTS",options)
    const response = await fetch(API_URL+url,
        {
            headers:{
                // "Content-Type": content_type, // This is set in both cases
                ...(content_type? {"Content-Type":content_type}:{}),
                ...(user ? { "Authorization": `Bearer ${user.token}` } : {}) // Conditionally include Authorization header
              },
            mode:"cors",
            ...options //for more options if i have them like method
        }
    )
    const data = await response.json()
    if (response.ok) return data; //no errors
    if (response.status==401 && data.msg=='TokenExpiredError'){
        throw new Error("Token has expired. Please login again.")
    } else {
        console.log(data);
        throw new Error(data.error  || 'Failied to fetch data')
    }

}