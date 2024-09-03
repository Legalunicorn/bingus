
import { sidebarData } from "./sidebarData";
import "./sidebar.scss"
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    // console.log(sidebarData)
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <ul className="sidebar-ul">
                {sidebarData.map((item,key)=>(
                    <li className="sidebar-element" key={key} onClick={()=>{navigate(`/p${item.link}`)}}>
                        {<item.icon/>}
                        <p className="nav-name">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Sidebar;