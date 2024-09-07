import "../../pages/userProfile/userProfile.scss"

const ProfileStats = ({
        followers,
        following,
        posts
}) => {
    return (
        <div className="stats">
            <div>
                <p>{followers}</p>
                <p>Followers</p>

            </div>
            <div>
                <p>{following}</p>
                <p>Following</p>

            </div>
            <div>
                <p>{posts}</p>
                <p>Posts</p>
            </div>
    </div>
    );
}
 
export default ProfileStats;