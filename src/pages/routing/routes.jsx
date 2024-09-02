import { createBrowserRouter,Outlet } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoutes"
import Layout from "./Layout"
import Home from "../home/Home"
import AuthPage from "../auth/AuthLayout"
// import

//pages



//auth, others, 

const router = createBrowserRouter([
    {
        // element: 
        path:"/auth",
        children:[
            {
                path:"login",
                element:<AuthPage form='Login'/>
            },
            {
                path:"signup",
                element: <AuthPage form='Signup'/>
            },
        ],
    },{
        path:"/",
        element:<Layout/>,
        children:[
            //Unprotected Routes
            {
                path:"",
                element:<p>penis</p>//create the UI for the feed page
            },

            {
                path:"about",
                element:<p></p>
            },
            //Protected Routes 
            {
                element: (
                    <ProtectedRoute/>
               
                ),
                path:"p", //protected
                children:[
                    {
                        path:"home",
                        element:<Home/>
                    },
                    {
                        path:"users/:username"
                    }
                ]
            }
        ]   
    }
])

export default router