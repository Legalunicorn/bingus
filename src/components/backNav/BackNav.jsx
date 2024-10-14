import { IconArrowLeft } from "@tabler/icons-react";
import "./backNav.scss";
import { useNavigate } from "react-router-dom";

const BackNav = ({
  label = "Post",
  customNav,
  image=null,
  labelLink=null
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!customNav) {
      if (window.history.state) navigate(-1);
    } //go back a page
    else navigate(customNav);
  };

  return (
    <div className="nav-back">
      <IconArrowLeft onClick={handleClick} />
      {image && labelLink && 
      <img onClick={()=>{navigate(labelLink)}}  src={image} alt="profile_pic"/>
      }
      {labelLink
      ?<p className="back-nav-link" onClick={()=>{navigate(labelLink)}}>{label}</p>
      :<p>{label}</p>}
      
    </div>
  );
};

export default BackNav;
