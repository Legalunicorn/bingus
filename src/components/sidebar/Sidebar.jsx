
import { sidebarData } from "./sidebarData";
import "./sidebar.scss"

const Sidebar = () => {
    console.log(sidebarData)
    return (
        <div className="sidebar">
            <ul className="sidebar-ul">
                {sidebarData.map((item,key)=>(
                    <li className="sidebar-element" key={key}>
                        {<item.icon/>}
                        <p className="nav-name">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Sidebar;