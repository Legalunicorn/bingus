
import "./auth.scss"
import { Form, useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import Logo from "../../assets/images/bingus_logo.svg"
import GoogleLogo from "../../assets/images/google.svg"
import { useAuthContext } from "../../hooks/useAuthContext";
import { myFetch } from "../../utils/myFetch";
import { IconAlertOctagon } from "@tabler/icons-react";

const Login = () => {
    const navigate = useNavigate();
    const [error,setError] = useState();
    const [disabled,setDisabled] = useState(false);
    const {user,dispatch} = useAuthContext();

    //TODO uncomment this after testing login properly
    // useEffect(()=>{
    //     if (user){
    //         console.log("Already Logged in. Redirecting..")
    //         navigate("/p/home")
    //     }
    // },[])

    const handleSubmit = async(e)=>{
        setDisabled(true);
        e.preventDefault();
        try{
            const data = await myFetch("/auth/local/login",{
                method:"POST",
                body:JSON.stringify({
                    username:e.target.username.value,
                    password:e.target.password.value
                })
            })
            //will automatically throw error if !response.ok
            //so anything here any below should be response ok 
            // check first
            console.log(data);
            const {token,username} = data; //from the server
            dispatch({type:"LOGIN",payload:{token,username}})
            localStorage.setItem('user',JSON.stringify({token,username}))
            navigate("/p/home")
        } catch(err){
            console.log(err);
            setDisabled(false);
            setError(err.message);
        }
    }


    return (
    <>
            <img src={Logo} alt="" />
            <p>Welcome back!</p>
            <p>Please fill in your login details</p>
            <Form onSubmit={handleSubmit} className="form-general login">
                <input
                    // ref={username}
                    name="username"
                    type="text"
                    placeholder='Username'
                    minLength="2" maxLength="35"
                    pattern="^[a-zA-Z0-9_.]*$"
                    autoComplete="new-password"
                    title="Username must be alphanumeric, and may contain periods, understore, and hypens"
                    required
                    />
                <input
                    type="password"
                    name="password"
                    // ref={password}
                    placeholder='Password'
                    minLength="2"
                    required
                    />
                <button disabled={disabled} type="submit">Login</button>
            </Form>

            <p  className='signup'>Don't have an account? <span onClick={()=>navigate("../signup")}>Sign up</span></p>
            {/* <p className="error-box">{error && <IconAlertOctagon/>}}</p> */}
            <p className="error-box">{
                error ? 
                    <>
                        <IconAlertOctagon size="18px"/>
                        {error}
                    </>:
                    ""
                }
            </p>

            <p className="or"><span>or</span></p>


            <button className="google" >
                <img className="google-icon" src={GoogleLogo} alt="" />
                <span>Continue with Google</span>
            </button>
          
    </>

    );
}
 
export default Login;

//username between 2-35
///^[a-zA-Z0-9_.]*$/