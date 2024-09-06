import { formatDistanceToNowStrict } from "date-fns";
import "./replyCard.scss"
import { IconHeart } from "@tabler/icons-react";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;
const ReplyCard = ({comment}) => {
    const written_time = formatDistanceToNowStrict(new Date(comment.createdAt));

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
                <p>
                    <IconHeart/> {comment._count.likes}
                </p>

                         
            </div>
        </div>
    );
}
 
export default ReplyCard;