import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { user: action.payload };
    }
    case "LOGOUT": {
      return { user: null };
    }
    case "UPDATE": {
      return {
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }
    default:
      state; //no changes
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [loading, setLoading] = useState(true);
  //check local storage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      // console.log("INsie auth context user: ",user)

      //we login on the basis that they have a user object
      dispatch({ type: "LOGIN", payload: JSON.parse(user) }); //README no changed needed
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
