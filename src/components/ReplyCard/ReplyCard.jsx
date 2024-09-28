import { formatDistanceToNowStrict } from "date-fns";
import "./replyCard.scss"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import useCommentMutation from "../../hooks/useCommentMutation";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;
const ReplyCard = ({comment,refetch}) => {
    const written_time = formatDistanceToNowStrict(new Date(comment.createdAt));

    //README took me 2hrs to debug. i wass passing refetch into the parent comment instead of here
    const {likeComment,unlikeComment} = useCommentMutation(comment,-1,refetch); //no need to pass post id for replies a

    return (
        <div className="reply-card">
            <div className="reply-header"> 
                {comment.user.profile?
                <img  src={comment.user.profile.profilePicture} alt="" />:
                <img  src={VITE_DEFAULT_PFP} alt="" />
                }
                
                <span>{comment.user.username}</span>
                <span>•</span>
                <span>{written_time} ago</span>
            </div>
            <p className="reply-body">{comment.body}</p>
            <div className="reply-buttons">
            {comment.likes.length>0?
                    <p>
                        <IconHeartFilled
                            className="red-heart"
                            onClick={(e)=>{
                                e.stopPropagation();
                                unlikeComment.mutate();

                            }}
                        />
                        {comment._count.likes}
                    </p>:
                    <p>
                        <IconHeart
                            
                            onClick={(e)=>{
                                e.stopPropagation();
                                likeComment.mutate();

                            }}
                        />
                        {comment._count.likes}
                    </p>                  
                }

                         
            </div>
        </div>
    );
}
 
export default ReplyCard;