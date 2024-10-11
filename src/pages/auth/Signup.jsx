
import "./auth.scss"
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/bingus_logo.svg"
import GoogleLogo from "../../assets/images/google.svg"
import { useAuthContext } from "../../hooks/useAuthContext";
import { myFetch } from "../../utils/myFetch";
import { IconAlertOctagon, IconEye, IconEyeOff } from "@tabler/icons-react";

const Signup = () => {
    const navigate = useNavigate();
    const [error,setError] = useState();
    const {dispatch} = useAuthContext();
    const [disabled,setDisabled] = useState(false); //loading state
    const [passVisible,setPassVisible] = useState(false);
    const [confirmVisible,setConfirmVisible] = useState(false);
    
    const [pass,setPass] = useState("");
    const [confirm,setConfirm] = useState("")

    const passChange = (e)=>{
        setPass(e.target.value)
    }
    const confirmChange = (e)=>{
        setConfirm(e.target.value)
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {displayName,password,confirm_password} = e.target;
        if (password.value!=confirm_password.value){
            return;
        }
        setDisabled(true);
        try{
            const data = await myFetch("/auth/local/signup",{
                method:"POST",
                body:JSON.stringify({
                    username: e.target.username.value, //didnt destruction because i use the variable username below for ease
                    displayName: displayName.value, //change backend+frontend to use underscore instead of camel casins
                    password: password.value,
                    confirm_password: confirm_password.value
                })
            })
            // console.log(data);
            //DONE
            dispatch({type:"LOGIN",payload:data})
            localStorage.setItem("user",JSON.stringify(data))
            navigate("/p/home")

        } catch(err){
            console.log(err);
            setError(err.message)
            setDisabled(false)
        }


    }

    return (
    <>
            <img src={Logo} alt="" />
            <p>Join us Today!</p>
            <p>Please fill in your details below</p>
            <Form className="form-general login" onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    placeholder='Username'
                    required
                    minLength="2" maxLength="35"
                    autoComplete="new-password"
                    pattern="^[a-zA-Z0-9_.]*$"
                    title="Username must be alphanumeric, and may contain periods, understore, and hypens"
                />
                <input 
                    name="displayName"
                    type="text"
                    placeholder='Display Name'
                    required
                    minLength="2" maxLength="35"
                />
                <div className="input-container">
                    <input 
                        value={pass}
                        onChange={passChange}
                        name="password"
                        type={passVisible?"text":"password"}
                        placeholder='Password'
                        minLength="3"
                        required
                        autoComplete="new-password"
                    />
                    
                    {passVisible?
                        <IconEye 
                            className="input-icon"
                            onClick={()=>{setPassVisible(false)}}
                        />:
                        <IconEyeOff
                            className="input-icon"
                            onClick={()=>{setPassVisible(true)}}
                        />
                    }
                    
                </div>

                <div className="input-container">
                    <input
                        value={confirm}
                        className={pass!=confirm? "mismatch":""}
                        onChange={confirmChange}
                        name="confirm_password"
                        type={confirmVisible?"text":"password"}
                        placeholder='Confirm Password'
                        minLength="3"
                        required
                        autoComplete="new-password"
                    />
                    {confirmVisible?
                        <IconEye 
                            className="input-icon"
                            onClick={()=>{setConfirmVisible(false)}}
                        />:
                        <IconEyeOff
                            className="input-icon"
                            onClick={()=>{setConfirmVisible(true)}}
                        />
                    }                    

                </div>

                <button disabled={disabled} type="submit">Sign up</button>
            </Form>

            <p className='signup'>Already have an account? <span onClick={()=>navigate("../login")}>Login</span></p>
            <p className="error-box">
                {
                error ? 
                    <>
                        <IconAlertOctagon size="18px"/>
                        {error}
                    </>:
                    ""
                }
                {
                pass!=confirm ? 
                    <>
                        <IconAlertOctagon size="18px"/>
                        <span>Passwords do not match</span>
                    </>:
                    ""
                }
            </p>

            <p className="or"><span>or</span></p>

            <button className="google"onClick={()=>{window.location.href=`${API_URL}/auth/oauth/google`}}>
                <img className="google-icon" src={GoogleLogo} alt="" />
                <span>Continue with Google</span>
            </button>
          
            {/* <GoogleButton/> */}

        {/* </div> */}

    </>

    );
}
 
export default Signup;