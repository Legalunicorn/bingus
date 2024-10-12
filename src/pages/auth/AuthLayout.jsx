//For login and sign up pages, which shares the same layout
import "./auth.scss";
// import Signup from "./Signup";
import Bingus3D from "../../assets/images/bingus_3d.png";

const AuthPage = ({ children }) => {

  return (
    <div className="auth-page">
      <div className="form-side">
        {children}
      </div>
      <div className="art-side">
        <p>Bingus</p>
        <p>
          Your network, <span>redefined</span>.
        </p>

        <img src={Bingus3D} alt="" />
      </div>
    </div>
  );
};


export default AuthPage;
