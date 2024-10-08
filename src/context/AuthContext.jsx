import { createContext,useReducer,useEffect,useState } from "react";

export const AuthContext = createContext();
export const authReducer = (state,action) =>{
    switch(action.type){
        case 'LOGIN':{
            return {user:action.payload}
        }
        case 'LOGOUT':{
            return {user:null}
        }
        case 'UPDATE':{
            return {user:{
                ...state.user,
                ...action.payload
            }}
        }
        default:
            state; //no changes
    }
}


export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    })
    const [loading,setLoading] = useState(true);
    //check local storage 
    useEffect(()=>{
        // localStorage.setItem("user",JSON.stringify({"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI1MDcwNTc2LCJleHAiOjE3MjU1MDI1NzZ9.KjKLKXWSNgarlD0a3fVQrgkOuq6vkS8UcxCjMmmZVks","username":"Bingus2"}))
        const user = localStorage.getItem("user")
        if (user){ //user.username, user.token etc
            console.log("INsie auth context user: ",user)
            
            //we login on the basis that they have a user object
            // if its an invalid user object, they wont be able to access valid endpoints anyways
            dispatch({type:"LOGIN",payload:JSON.parse(user)}) //README no changed needed
        }
        setLoading(false);
    },[])

    return (
        <AuthContext.Provider value={{...state,dispatch,loading}} >
            {children}
        </AuthContext.Provider>
    )
}