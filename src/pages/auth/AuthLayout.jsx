//For login and sign up pages, which shares the same layout
import "./auth.scss"
// import Signup from "./Signup";
import Bingus3D from "../../assets/images/bingus_3d.png"
import Login from "./Login";
import { useEffect, useState } from "react";

import { Form } from "react-router-dom";
import Signup from "./Signup";


const AuthPage = ({form}) => {
    const [currForm,setCurrForm] = useState(form || 'Login'); //'Login' or 'Signup'
    // //form = login OR sign up. will display dyniamically
    useEffect(()=>{
        setCurrForm(form) //when user clicks button to login/signup -> rerender auth layout
    },[form])
    return (
        <div className="auth-page">
            <div className="form-side">
                {currForm=='Login'?<Login/>:<Signup/>}
            </div>
            <div className="art-side"> 
                <p>Bingus</p>
                <p>Your network, <span>redefined</span>.</p>
                
                <img src={Bingus3D} alt="" />

            </div>
        </div>
    );
}
 

/*

FLOW
-> pass in login as props
-> render login
-> click on logout
-> setForm = signup, what happens?


-> create a wrapper which is like the left and right but the form fields are empty


SIGNUP
-> use the wrapper, and insert the fields 
-> pass in PROPS into the auth wratter to show the type of page it is current at 
*/


export default AuthPage;