import { createBrowserRouter,Outlet } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoutes"
import Layout from "./Layout"
import Home from "../home/Home"
// import

//pages



const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            //Unprotected Routes
            {
                path:"/",
                element:<Home/> //create the UI for the feed page
            },
            {
                path:"/login",
                element:<p>-</p>
            },
            {
                path:"/signup",
                element: <p>-</p>
            },
            {
                path:"/about",
                element:<p></p>
            },
            //Protected Routes 
            {
                element: (
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                ),
                children:[
                    {
                        path:"/",
                        element:<p>Home</p>
                    },
                    {
                        path:"/users/:username"
                    }
                ]
            }
        ]   
    }
])

export default router