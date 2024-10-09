
import { IconArrowLeft } from "@tabler/icons-react";
import "./backNav.scss"
import { useNavigate } from "react-router-dom";


//TODO decide if this needs any props
//TODO , if needed, put dynamic styling as props and set the class appropriate ly
const BackNav = ({
    label="Post",
    customNav
}) => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        if (!customNav) navigate(-1); //go back a page
        else navigate(customNav)
    }
    return (
        <div className="nav-back">
            <IconArrowLeft
                onClick={handleClick}
            />
            <p>{label}</p>
        </div>
    );
}
 
export default BackNav;