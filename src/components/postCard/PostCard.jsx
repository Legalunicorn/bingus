import { formatDistanceToNowStrict } from "date-fns";
import "./postCard.scss"
import { IconBrandGithub, IconHeart, IconLink, IconMessageCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";


const PostCard = ({ //TODO decide if i should reuse this for the post page
    //TODO add a option to make the card clicakble or not? or make it in the home
    post, //should be an object with the following
    handleClick
}) => { 
    const written_time = formatDistanceToNowStrict(new Date(post.createdAt));

    //BUG
    const navigate = useNavigate();

    if (post.attachment){
        console.log(post.public_id);
    }


    //TODO identify whether the user has liked this post before or not
    //TODO include it in the API call somehow
    return (
        <div onClick={handleClick} className="postcard">


            <div className="post-header"> 
                {post.author.profile?
                <img  src={post.author.profile.profilePicture} alt="" />:
                <img  src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                }
                
                <span>{post.author.username}</span>
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
                    <IconHeart /> {post._count.likes}
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

//TODO remove unneccesary names

/**
 * POST:
 * id
 * body //DONE
 * gitLink //DONE
 * repoLink //DONE
 * attachment //DONE
 * public_id //DONE
 * createdAt //DONE
 * nextPostId
 * userId (?)
 * _count
 *  - likes //DONE
 *  - comments //DONE
 * tags: [] //DONE
 * author: //FIX NO NEED
 *  -id
 *  -username //DONE
 *  -displayname //FIX NO NEED
 *  :profile
 *    -profilePicture //DONE
 *
 */

/*

//test data
        {
            "id": 13,
            "body": "Id 12 from BINGUS",
            "gitLink": "https://github.com/Legalunicorn/bingus-api",
            "repoLink": "https://github.com/Legalunicorn/bingus-api",
            "attachment": null,
            "public_id": null,
            "createdAt": "2024-08-20T08:20:05.350Z",
            "nextPostId": null,
            "userId": 2,
            "_count": {
                "likes": 0,
                "comments": 0
            },
            "tags": [
                {
                    "name": "tag1"
                },
                {
                    "name": "tag5"
                }
            ],
            "author": {
                "id": 2,
                "username": "Bingus2",
                "displayName": "User 0",
                "profile": {
                    "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                }
            }
        }
*/