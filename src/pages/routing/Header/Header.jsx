import { IconBell } from "@tabler/icons-react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./header.scss"
import Logo from "../../../assets/images/bingus_logo.svg"



const Header = () => {
    //user AuthContext and load the user for now user a fake user 
    const {user} = useAuthContext();
    return (
        <div id="header">
            <img className="logo" src={Logo} alt="" />
            <p className="brand">Bingus</p>
            

            <IconBell 
            className="notif"
            size="30"
            />
            <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/b589cd15-608d-412c-86d7-f6c2fe162924/width=450/3917845.jpeg" alt="" />
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