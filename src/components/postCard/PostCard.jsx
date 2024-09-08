import { formatDistanceToNowStrict } from "date-fns";
import "./postCard.scss"
import { IconBrandGithub, IconHeart, IconHeartFilled, IconLink, IconMessageCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";


const PostCard = ({ //TODO decide if i should reuse this for the post page
    //TODO add a option to make the card clicakble or not? or make it in the home
    post, //should be an object with the following
    handleClick,
    page,
    pageId //ie. userId if we're on a userId page
}) => { 
    const written_time = formatDistanceToNowStrict(new Date(post.createdAt));
    const queryClient = useQueryClient();
    const myFetch = useFetch();

    const getPageQueryKey =()=>{
        //Im doing this so that we only optimistically update the page that we're on
        if (page=='viewUser') return ['user',pageId] //userId
        else if (page=='editProfile') return ['posts','profile']
        else if (page==='viewPost') return ['posts',post.id]
        else return ['feed'] //default to feed
    }

    const likePost = async()=>{
        return await myFetch(`/posts/${post.id}/like`,{
            method:"POST"
        })
    }
    const likePostMutation = useMutation({
        mutationFn: likePost,
        onMutate: async()=>{
            const qKey = getPageQueryKey();
            await queryClient.cancelQueries(qKey) 
            //store the previous data first
            const previousData = queryClient.getQueryData(qKey)
            //optimistically update
            queryClient.setQueriesData(qKey,(oldData)=>{
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    posts: oldData.posts.map(p=>{
                        p.id===post.id ?{
                            ...p,
                            likes:[true], //user has liked
                            _count:{
                                likes:p._count.likes+1 //plus one more like
                            }
                        }:p //return p
                    })
                }
            })
            return {previousData}; //The cache we stored for potential rollback
        },
        onError:(error,variables,context)=>{
            //Error, roll back optimistic updates
            if (context?.previousData){ //this should be true anyways 
                const qKey = getPageQueryKey();
                queryClient.setQueriesData(qKey,context.previousData)
            }
        },
        onSettled:()=>{
            //invalidate all queries 
            queryClient.invalidateQueries(['feed'])
            //README actually i dont need to invalidate profile if the post doesnt belong to me right?
            //TODO check if the author of the post is the user itself, else there is no need to invalidate profile at all
            queryClient.invalidateQueries(['posts']) //all posts whether its profile
            queryClient.invalidateQueries(['user',pageId])
        }
    })
    const unlikePost = async()=>{
        return await myFetch(`/posts/${post.id}/unlike`,{method:"POST"})
    }

    //BUG
    const navigate = useNavigate();
    return (
        <div onClick={handleClick} className="postcard">


            <div className="post-header"> 
                {post.author.profile?
                <img  src={post.author.profile.profilePicture} alt="" />:
                <img  src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                }
                
                <span onClick={(e)=>{e.stopPropagation();navigate(`/p/users/${post.author.id}`)}}>{post.author.username}</span>
                <span>•</span>
                <span>{written_time} ago</span>
            </div>
            <div className="post-body">
                <p>{post.body}</p>
                <p className="post-tags">
                {post.tags && post.tags.map((tag,key)=>(
                    <span key={key}>#{tag.name}</span>
                ))}
   
                </p>


                {post.attachment &&
                    <img src={post.attachment} alt="Post Media"/>
                }

            </div>
            <div className="post-buttons">
                <p>
                    {post.likes.length>0?
                        <IconHeartFilled 
                            className="red-heart"
                        />
                    :
                        <IconHeart/>
                    }
                    {post._count.likes}
                </p>
                <p>
                    <IconMessageCircle/> {post._count.comments}
                </p>

                {post.repoLink && <IconLink/>}
                {post.gitLink && <IconBrandGithub/>}
                
            </div>
            
        </div>

    );
}
 
export default PostCard;