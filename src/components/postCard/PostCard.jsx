import { formatDistanceToNowStrict } from "date-fns";
import "./postCard.scss";
import {
  IconBrandGithub,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import usePostMutation from "../../hooks/usePostMutation";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;

const PostCard = ({
  post, //should be an object with the following
  pageQueryKey,
  showDelete=false
}) => {
  const written_time = formatDistanceToNowStrict(new Date(post.createdAt));
  const queryKey = pageQueryKey || ["feed"];
  const { likePost, unlikePost, deletePost } = usePostMutation(post, queryKey);
  const navigate = useNavigate();
  const currUserId = Number(useAuthContext().user.id);
  const [type,setType] = useState(null); //null
  // if (post && post.attachment){

  //   if (imgExt.some(etx=>post.attachment.toLowerCase().endsWith(etx))) setIsImg(true)
  //   else if (vidExt.some(etx=>post.attachment.toLowerCase().endsWith(etx))) setIsImg(false)
  // }

  useEffect(()=>{
    if (post.attachment){
      const ext = post.attachment.split(".").pop().toLowerCase();
      const imgExt =  ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      const vidExt =  ['mp4', 'webm', 'ogg', 'mkv'];
      if (imgExt.includes(ext)) setType("img")
      else if (vidExt.includes(ext)) setType("video")
    }

  },[post])



  if (post && post.gitLink) {
    post.gitLink = "www.github.com";
    if (post.gitLink.startsWith("www"))
      post.gitLink = `https://${post.gitLink}`;
  }


  //Find content type based on extensions bc im totally a genius

  // if (post && post.attachment) console.log(post.attachment)

  return (
    <div onClick={() => navigate(`/p/posts/${post.id}`)} className="postcard">
      <div className="post-header">
        {post.author.profile ? (
          <img src={post.author.profile.profilePicture} alt="" />
        ) : (
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt=""
          />
        )}

        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/p/users/${post.author.id}`);
          }}
        >
          {post.author.username}
        </span>
        <span>•</span>
        <span className="written-time">{written_time} ago</span>
        {post.userId === currUserId && showDelete &&  (
          <IconTrash
            onClick={(e) => {
              e.stopPropagation();
              deletePost.mutate();
            }}
          />
        )}
      </div>
      <div className="post-body">
        <p>{post.body}</p>
        <p className="post-tags">
          {post.tags &&
            post.tags.map((tag, key) => <span key={key}>#{tag.name}</span>)}
        </p>

        {post.attachment && type==="img" && <img src={post.attachment} alt="Post Media" />}
        {post.attachment && type==="video" && 
        <>
          <video  poster={post.attachment} controls >
          <source src={post.attachment} type="video/mp4"/>
        </video>
  
        </>
        }

      </div>
      <div className="post-buttons">
        <p>
          {post.likes.length > 0 ? (
            <IconHeartFilled
              className="red-heart"
              onClick={(e) => {
                e.stopPropagation();
                unlikePost.mutate();
              }}
            />
          ) : (
            <IconHeart
              onClick={(e) => {
                e.stopPropagation();
                likePost.mutate();
              }}
            />
          )}
          {post._count.likes}
        </p>
        <p>
          <IconMessageCircle /> {post._count.comments}
        </p>

        {/* {post.repoLink && <IconLink />} */}
        {post.gitLink && (
          <IconBrandGithub
            onClick={() => {
              window.open(`${post.gitLink}`, "_blank", "noopener,noreferrer");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
