import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import "./layout.scss"


//page -> side bar + content

export default function Layout () {
    return (
        <>
            {/* eveyrthing */}
            <div id="main"> 
                <Header/>
                {/* page is for the entire set up without the header*/}
                <div id="page"> 
                    <Sidebar/>
                    {/* content is for the main feed */}
                    {/* <div className="content"> */}
                        <Outlet/>
                    {/* </div> */}
                    
                </div>
            </div>

        </>

    );
}
 
// export default Layout;