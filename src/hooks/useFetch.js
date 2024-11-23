import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
const API_URL = import.meta.env.VITE_API_URL;

export function useFetch() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleFetch = async (url, options = {}, content_type = true) => {

    await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch(API_URL + url, {
      headers: {
        ...(content_type ? { "Content-Type": "application/json" } : {}),

        //if there is a content type we set it to null
        //if there is no content type
        ...(user ? { Authorization: `Bearer ${user.token}` } : {}),
      },
      mode: "cors",
      ...options,
    });
    const data = await response.json();
    if (response.ok) return data;
    if (response.status == 401 && data.error == "TokenExpiredError") {
      navigate("/auth/login");
      throw new Error("Token has expired. Please login again");
    } else {
      console.log("$err", data);
      throw new Error(data.error || "Failed to fetch data");
    }
  };

  return handleFetch; //returns a function // useFetch is aHigher order function
}
