import "./profilePreview.scss";
import useFollowMutation from "../../hooks/useFollowMutation";


const ProfilePreview = ({
    user 
}) => {
    //TODO onclick for follow unfollow users
    // console.log(user)

    const {follow,unfollow} = useFollowMutation(user,['feed']);
    return (
        <div className="profile-preview-card">
            {user.profile && user.profile?.profilePicture ?
            <img src={user.profile.profilePicture} alt="" />
            :
            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt=""/>
            }
            
            <div>
                <p>{user.username}</p>
                <p>{user.displayName}</p>             
            </div>
            {user.followers.length==0?
            <button className="filled"
                onClick={()=>follow.mutate()}
            >
                Follow
            </button>:
            <button
                onClick={()=>unfollow.mutate()}
            >
                Unfollow
            </button>
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