import { formatDistanceToNowStrict } from "date-fns";
import "./commentCard.scss"
import { IconHeart, IconMessage, IconMessage2, IconMessageCircle, IconMessages } from "@tabler/icons-react";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;
const CommentCard = ({comment}) => {
    const written_time = formatDistanceToNowStrict(new Date(comment.createdAt));

    //TODO figure out how to get x number of replies. probably use a useState and a offset from db
    return (

        <div className="parent-comment-card">
            <div className="comment-header"> 
                {comment.user.profile?
                <img  src={comment.user.profile.profilePicture} alt="" />:
                <img  src={VITE_DEFAULT_PFP} alt="" />
                }
                
                <span>{comment.user.username}</span>
                <span>•</span>
                <span>{written_time} ago</span>
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="comment-buttons">
                <p>
                    <IconHeart/> {comment._count.likes}
                    {/* <span>{comment._count.likes}</span> */}
                </p>
                <p>
                    <IconMessages/> show replies
                </p>   
                <p><IconMessage/> reply</p> 
                         
            </div>
        </div>
    );
}
 
export default CommentCard;

//can receive a child comment 


//Sample data 
let x = {  "comments": [
    //
            {
                "id": 2, 
                "body": "Second comment under post 11", //DONE
                "createdAt": "2024-08-20T13:01:20.922Z", //DONE
                "parentCommentId": null,
                "_count": {
                    "likes": 0
                },
                "user": {
                    "id": 1,
                    "username": "Hm",
                    "displayName": "User 0",
                    "profile": null
                },
                "childComment": []
            },
    //            
            {
                "id": 1,
                "body": "First commet under post 11",
                "createdAt": "2024-08-20T13:00:51.142Z",
                "parentCommentId": null,
                "_count": {
                    "likes": 1
                },
                "user": {
                    "id": 1,
                    "username": "Hm",
                    "displayName": "User 0",
                    "profile": null
                },
                "childComment": []
            }
        ]
}
