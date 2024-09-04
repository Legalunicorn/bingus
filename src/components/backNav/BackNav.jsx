
import { IconArrowLeft } from "@tabler/icons-react";
import "./backNav.scss"
import { useNavigate } from "react-router-dom";


//TODO decide if this needs any props
//TODO , if needed, put dynamic styling as props and set the class appropriate ly
const BackNav = ({label="Post"}) => {
    const navigate = useNavigate();
    return (
        <div className="nav-back">
            <IconArrowLeft
                onClick={()=>navigate(-1)}
            />
            <p>{label}</p>
        </div>
    );
}
 
export default BackNav;