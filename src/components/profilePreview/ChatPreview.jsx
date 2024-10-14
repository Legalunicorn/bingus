import { useNavigate } from "react-router-dom";
import "./profilePreview.scss";
const ChatPreview = ({ chat,hover=false }) => {
  const user = chat.otherUser;
  const navigate = useNavigate();

  const image_url = user.profile && user.profile?.profilePicture ? user.profile.profilePicture : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  const handleClick = () => {
    navigate(`${chat.id}`,{state:{url:image_url}});
  };
  return (
    <div onClick={handleClick} className="profile-preview-card chat-preview">
      <img src={image_url} alt="" />
      <div>
        <p
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/p/users/${user.id}`);
          }}
        >
          {user.username}
        </p>
        <p>{chat.lastMessage || "(New Chat)"}</p>
      </div>
    </div>
  );
};

export default ChatPreview;
