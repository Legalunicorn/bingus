
import "./auth.scss"
import { Form, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/bingus_logo.svg"
import GoogleLogo from "../../assets/images/google.svg"
import GoogleButton from "./GoogleButton";
import { IconBrandGoogle } from "@tabler/icons-react";
import {useAuthContext} from "../../hooks/useAuthContext"
import { useEffect } from "react";

const Signup = () => {
    const navigate = useNavigate();
    
    const [error,serError] = useState();
    const [disabled,setDisabled] = useState(false); //loading state


    const handleSubmit = async(e)=>{

    }

    return (
    <>
            <img src={Logo} alt="" />
            <p>Join us Today!</p>
            <p>Please fill in your details below</p>
            <Form className="form-general login">
                <input
                    type="text"
                    placeholder='Username'
                    required
                    minLength="2" maxLength="35"
                    autoComplete="new-password"
                    pattern="^[a-zA-Z0-9_.]*$"
                    title="Username must be alphanumeric, and may contain periods, understore, and hypens"
                />
                <input 
                    type="text"
                    placeholder='Display Name'
                    required
                    minLength="2" maxLength="35"
                />
                <input 
                    type="password"
                    placeholder='Password'
                    minLength="3"
                    required
                    />
                <input 
                    type="password"
                    placeholder='Confirm Password'
                    minLength="3"
                    required
                    />
                <button disabled={disabled} type="submit">Sign up</button>
            </Form>

            <p className='signup'>Already have an account? <span onClick={()=>navigate("../login")}>Login</span></p>

            <p className="or"><span>or</span></p>

            <button className="google">
                <img className="google-icon" src={GoogleLogo} alt="" />
                <span>Continue with Google</span>
            </button>
          
            {/* <GoogleButton/> */}

        {/* </div> */}

    </>

    );
}
 
export default Signup;