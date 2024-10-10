import { formatDistanceToNowStrict } from "date-fns";
import "./postCard.scss"
import { IconBrandGithub, IconHeart, IconHeartFilled, IconLink, IconMessageCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import usePostMutation from "../../hooks/usePostMutation";

const PostCard = ({
    post, //should be an object with the following
    handleClick, //BUG why did i even add this for 
    pageQueryKey,
}) => {
    const written_time = formatDistanceToNowStrict(new Date(post.createdAt));
    const queryKey = pageQueryKey || ['feed'];
    const {likePost,unlikePost} = usePostMutation(post,queryKey);
    const navigate = useNavigate(); //BUG go external pages
    return (
        <div onClick={()=>navigate(`/p/posts/${post.id}`)} className="postcard">


            <div className="post-header">
                {post.author.profile ?
                    <img src={post.author.profile.profilePicture} alt="" /> :
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                }

                <span onClick={(e) => { e.stopPropagation(); navigate(`/p/users/${post.author.id}`) }}>{post.author.username}</span>
                <span>•</span>
                <span>{written_time} ago</span>
            </div>
            <div className="post-body">
                <p>{post.body}</p>
                <p className="post-tags">
                    {post.tags && post.tags.map((tag, key) => (
                        <span key={key}>#{tag.name}</span>
                    ))}

                </p>


                {post.attachment &&
                    <img src={post.attachment} alt="Post Media" />
                }

            </div>
            <div className="post-buttons">
                <p>
                    {post.likes.length > 0 ?
                        <IconHeartFilled
                            className="red-heart"
                            onClick={(e) =>{
                                e.stopPropagation();
                                unlikePost.mutate()
                            }}
                        />
                        :
                        <IconHeart
                            onClick={(e) => {
                                e.stopPropagation();
                                likePost.mutate()}}
                        />
                    }
                    {post._count.likes}
                </p>
                <p>
                    <IconMessageCircle /> {post._count.comments}
                </p>

                {post.repoLink && <IconLink />}
                {post.gitLink && <IconBrandGithub onClick={()=>{window.open(`https://${post.gitLink}`,"_blank",'noopener,noreferrer')}}/>}

            </div>

        </div>

    );
}

export default PostCard;