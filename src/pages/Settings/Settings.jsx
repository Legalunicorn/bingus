import { IconLogout } from "@tabler/icons-react";
import BackNav from "../../components/backNav/BackNav";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./settings.scss";
const Settings = () => {
  const { dispatch } = useAuthContext();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };
  return (
    <div className="content settings-page">
      <div>
        <BackNav label="Settings" />
        <div className="settings">
          <p className="section">Account</p>
          <div onClick={handleLogout} className="settings-button">
            <IconLogout />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

/*
Logout (important)
Theme (optional/low priority)

*/
