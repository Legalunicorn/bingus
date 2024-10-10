import { useNavigate } from "react-router-dom"
import "./profilePreview.scss"
const ChatPreview = ({chat}) => {
    const user = chat.otherUser
    const navigate = useNavigate()

    const handleClick=() =>{
        navigate(`${chat.id}`)
    }
    return (
        <div onClick={handleClick} className="profile-preview-card chat-preview">
            {user.profile && user.profile?.profilePicture ?
            <img src={user.profile.profilePicture} alt="" />
            :
            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt=""/>
            }
            <div>
            <p
                onClick={(e)=>{
                    e.stopPropagation();
                    navigate(`/p/users/${user.id}`)
                }}
            >{user.username}</p>
            <p>{chat.lastMessage|| '(New Chat)'}</p>
            </div>

        </div>
    );
}
 
export default ChatPreview;