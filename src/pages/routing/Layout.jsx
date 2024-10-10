import { Outlet, useRouteError } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import "./layout.scss"
import { useState } from "react";
import NotFound from "../Error/NotFound"
import BadRequest from "../Error/BadRequest";


//page -> side bar + content

export default function Layout ({children}) {

    const error = useRouteError();
    const status = error?.status;

    //Load this first
    return (
        <>
            {/* eveyrthing */}
            <div id="main"> 
                <Header/>
                {/* page is for the entire set up without the header*/}
                <div id="page"> 
                    <Sidebar
                    />
                    {error
                    ? <div className="content">
                        {status=== 404 
                        ? <NotFound/>
                        :<BadRequest/>}
                    </div>
                    :<Outlet/>
                    }

                    
                </div>
            </div>

        </>

    );
}
 
// export default Layout;