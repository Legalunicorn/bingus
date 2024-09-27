import "./profilePreview.scss";

const pfp = import.meta.env.VITE_DEFAULT_PFP;

const ProfilePreview = ({
    user 
}) => {
    //TODO onclick for follow unfollow users
    // console.log(user)
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
            {user._count.followers==0?
            <button className="filled">Follow</button>:
            <button>Unfollow</button>
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