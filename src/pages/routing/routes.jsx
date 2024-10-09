import { createBrowserRouter,Outlet } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoutes"
import Layout from "./Layout"
import Home from "../home/Home"
import AuthPage from "../auth/AuthLayout"
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import SetUsername from "../auth/SetUsername"
import CreatePost from "../createPost/CreatePost"
import ViewPost from "../viewPost/ViewPost"
import UserProfile from "../userProfile/UserProfile"
import EditProfile from "../EditProfile/EditProfile"
import SearchUsers from "../SearchUsers/SearchUsers"
import LikeFeed from "../LikeFeed/LikeFeed"
import Chats from "../Chats/Chats"
import DM from "../../components/DM/DM"
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
                element:(
                    <AuthPage>
                        <Login/>
                    </AuthPage>
                )
            },
            {
                path:"signup",
                // element: <AuthPage form='Signup'/>
                element:(
                    <AuthPage>
                        <Signup/>
                    </AuthPage>
                )
            },
            {
                element:
                // (<ProtectedRoute> //BUG this cannot be protected because token is not yet in the context
                    <AuthPage>
                        <SetUsername/>
                    </AuthPage>
                // </ProtectedRoute>),
                ,
                path: "oauth/setusername"
            }
        ],
    },{
        path:"/",
        element:<Layout/>,
        children:[
            /**
             * ============== UNPROTECTED ROUTES ===============
             */
            {
                path:"",
                element:<p>penis</p>//create the UI for the feed page
            },

            {
                path:"about",
                element:<p></p>
            },
            /**
             * =============== PROTECTED ROUTES =================
             */
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
                        path:"posts/:postId",
                        element: <ViewPost/>
                    },
                    {
                        path:"search",
                        element:<SearchUsers/>
                    },
                    {
                        path:"users/:userId",
                        element:<UserProfile/>
                    },
                    {
                        path:"view-profile",
                        element: <EditProfile/>
                    },
                    {  
                        path:"likes",
                        element:<LikeFeed/>
                    },
                    {
                        path:"create",
                        element:<CreatePost/>
                    },
                    {
                        path:"message",
                        element: <Chats/>,
                        // children:[
                        //     {
                        //         path:":ChatId",
                        //         element:<>penis</>
                        //         // element: <DM/>
                        //     }
                        // ]
                    },
                    {
                        path:"message/:chatId",
                        element: <DM/>
                    }
                ]
            }
        ]   
    }
])

export default router