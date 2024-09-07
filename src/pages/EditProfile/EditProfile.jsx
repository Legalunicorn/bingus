import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./editProfile.scss"
import { useFetch } from "../../hooks/useFetch";
const EditProfile = () => {
    const {user} = useAuthContext();
    const myFetch = useFetch('/');

    //fetch user based on username instead of id possible?
    // either i add an endpoint to fetch by username
    // or i add userId to local storage
    // security concerns
    /*
        if a user edit their local storage to a difference userId
        they will gain access to the other users profile based on this information
        to keep this secure, it should be based on the JWT itself

        we create an endpoint to view own profile, that will accept the JWT token
        JWT to verfify that the endpoint we trying to access is the same as the one 
        decoded from the JWT

        Thus it will be secured based on the backend
    */

    const fetchUser = async ()=>{
        return await myFetch('/')
    }

    // const {
    //     user,
    //     error
    // } = useQuery({

    // })
    return (
        <div>skibidi</div>

    );
}
 
export default EditProfile;