import "./profilePreview.scss";


const ProfilePreview = ({
    user 
}) => {
    return (
        <div className="profile-preview-card">

            <img src={user.profile.profilePicture} alt="" />
            <div>
                <p>{user.username}</p>
                <p>{user.displayName}</p>             
            </div>
            <button>Follow</button>

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