import { useNavigate, useParams } from "react-router-dom";
import "./userProfile.scss";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";
import {
  IconBrandGithub,
  IconMessageCircle,
  IconWorld,
} from "@tabler/icons-react";
import PostCard from "../../components/postCard/PostCard";
import BackNav from "../../components/backNav/BackNav";
import ProfileStats from "../../components/profileStats/ProfileStats";
import useFollowMutation from "../../hooks/useFollowMutation";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loaders/Loader";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;

//user.isBeingFollowed

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const myFetch = useFetch();
  const getUser = async ({ queryKey }) => {
    console.log("Passing ID:", queryKey);
    return await myFetch(`/users/${queryKey[1]}`);
  };
  const queryKey = ["user", userId, "post"];
  const authContext = useAuthContext();
  const { unfollow, follow } = useFollowMutation({ id: userId }, queryKey);
  const { data, isError, isPending } = useQuery({
    queryKey, //Post for invalidate Liking
    queryFn: getUser,
  });

  const { user } = data || {}; //for easier

  const handleChat = async () => {
    try {
      const data = await myFetch(`/chats/user/${userId}`, { method: "PUT" });
      console.log(data);
      navigate(`/p/message?chat=${data.chat.id}`);
    } catch (err) {
      console.log(err); //TODO handle create chat error here
    }
  };

  if (user && user.profile?.website) {
    user.profile.website = user.profile.website.startsWith("http")
      ? user.profile.website
      : `https://${user.profile.website}`;
  }
  if (user && user.profile?.github) {
    user.profile.github = user.profile.github.startsWith("http")
      ? user.profile.github
      : `https://${user.profile.github}`;
  }

  return (
    <div className="content user-profile-page">
      <div>
        {isPending ? (
          <Loader loading={isPending} />
        ) : (
          <>
            <BackNav label="User" />
            <div className="profile-main">
              {user?.profile?.profilePicture ? (
                <img src={user.profile.profilePicture} />
              ) : (
                <img src={VITE_DEFAULT_PFP} />
              )}
              <div>
                <p className="profile-username">{user.username}</p>
                <p className="profile-displayname">{user.displayName}</p>
                <ProfileStats
                  followers={user._count.followers}
                  following={user._count.following}
                  posts={user._count.posts}
                />
                {user.id !== Number(authContext.user.id) ? (
                  <div className="user-actions">
                    {user.followers.length > 0 ? (
                      <button onClick={() => unfollow.mutate()}>
                        Unfollow
                      </button>
                    ) : (
                      <button onClick={() => follow.mutate()}>Follow</button>
                    )}
                    <button onClick={handleChat}>
                      <IconMessageCircle />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="profile-details">
              {user?.profile?.bio && (
                <div>
                  <p className="profile-bio">{user.profile.bio}</p>
                </div>
              )}
              {user?.profile?.website && (
                <div>
                  <IconWorld />
                  <a href={`${user.profile.website.trim()}`} target="_blank">
                    {user.profile.website}
                  </a>
                </div>
              )}
              {user?.profile?.github && (
                <div>
                  <IconBrandGithub />
                  <a target="_blank" href={`${user.profile.github.trim()}`}>
                    github
                  </a>
                </div>
              )}
              <a href=""></a>
            </div>
            <div className="profile-posts">
              <p>Posts</p>
              {user.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  handleClick={() => navigate(`/p/posts/${post.id}`)}
                  pageQueryKey={["user", userId, "post"]}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default UserProfile;
