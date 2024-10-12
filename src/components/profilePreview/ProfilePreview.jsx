import "./profilePreview.scss";
import useFollowMutation from "../../hooks/useFollowMutation";
import { useNavigate } from "react-router-dom";



const ProfilePreview = ({
    user,
    showFollow = true,
    clickable = false
}) => {
    const navigate = useNavigate();


    const { follow, unfollow } = useFollowMutation(user, ['feed', 'post']);
    return (
        <div onClick={()=>{clickable && navigate(`/p/users/${user.id}`)}}className="profile-preview-card">
            {user.profile && user.profile?.profilePicture ?
                <img src={user.profile.profilePicture} alt="" />
                :
                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
            }

            <div>
                <p
                    onClick={() => navigate(`/p/users/${user.id}`)}
                >{user.username}</p>
                <p>{user.displayName}</p>
            </div>
            {showFollow
                ? (user.followers.length == 0
                    ? <button className="filled"
                        onClick={() => follow.mutate()}
                    >
                        Follow
                    </button> :
                    <button
                        onClick={() => unfollow.mutate()}
                    >
                        Unfollow
                    </button>
                )
                : <></>
            }

        </div>
    );
}


export default ProfilePreview;


/*
id 
username
displayName
profile
    profilePicture
followed or not
*/