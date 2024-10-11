import { IconBell } from "@tabler/icons-react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./header.scss"
import Logo from "../../../assets/images/bingus_logo.svg"
import { useNavigate } from "react-router-dom";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;



const Header = () => {
    //user AuthContext and load the user for now user a fake user 
    const {user} = useAuthContext();
    const navigate = useNavigate()
    
    return (
        <div id="header">

            <img className="logo" src={Logo} alt="" />
            <p onClick={()=>{navigate("/p/home")}} className="brand">Bingus</p>
            

            <div className="notif">


            </div>
            {user && user.profilePicture?
            <img src={user.profilePicture} alt="profile_picture" onClick={()=>navigate(`/p/users/${user.id}`)}/>:
            <img src={VITE_DEFAULT_PFP} alt="profile_picture" onClick={()=>navigate(`/p/users/${user.id}`)}/>
            }

        </div>
    );
}
 
export default Header;

//TODO
/**
 * 1. Bingus logo
 * 2. search bar 
 * 3. Create Post 
 * Notification bell 
 * Profile Picture (for user Page)
 */