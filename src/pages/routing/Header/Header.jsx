import { IconBell } from "@tabler/icons-react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./header.scss"
import Logo from "../../../assets/images/bingus_logo.svg"
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;



const Header = () => {
    //user AuthContext and load the user for now user a fake user 
    const {user} = useAuthContext();
    return (
        <div id="header">
            <img className="logo" src={Logo} alt="" />
            <p className="brand">Bingus</p>
            

            <div className="notif">
                <IconBell 
                // className="notif"
                size="30"
                />
                <span className="test">10</span>

            </div>
            {user?
            <img src={user.profilePicture} alt="profile_picture" />:
            <img src={VITE_DEFAULT_PFP} alt="profile_picture" />
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