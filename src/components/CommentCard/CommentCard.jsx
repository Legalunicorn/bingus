import { formatDistanceToNowStrict } from "date-fns";
import "./commentCard.scss"
import { IconHeart, IconMessage, IconMessages } from "@tabler/icons-react";
import { useState,Fragment } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ReplyCard from "../ReplyCard/ReplyCard";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;

//Manage the replies in here?
/*
How fetching replies works
i need to store the cursor Id, probably inside a useState
i need to store the child comment data too, also probably a useState
below the comment box, i simply map over all child data if any and render them
when fetching replies, i need to update the comment state as well as updated cursor
 */
const CommentCard = ({comment}) => {
    const written_time = formatDistanceToNowStrict(new Date(comment.createdAt));
    const [showReplies,setShowReplies] = useState(false);
    //TODO differentiate between show replies and show more

    const myFetch = useFetch();
    const fetchReplies = async({pageParam})=>{
        console.log("FETCH REPLIES CID::",pageParam)
        return await myFetch(`/comments/${comment.id}?cursorId=${pageParam}`)
    }
    //Attempt at useInfnite query


    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey:['replies',comment.id],
        queryFn: fetchReplies,
        initialPageParam: -1,
        getNextPageParam: (prevData)=>prevData.cursorId,
        enabled:false
        
        
    })
    if (status=='error') console.log(error);
    if (status=='error') return (<p>{error.message}</p>)
    console.log("s: ",data);

    // const showReplyQuery = useQuery({ 
    //     queryKey:["replies",comment.id] ,//invalidate this when new reply added? theres some logical issue with pagination and cursor i think
    //     queryFn: ()=>myFetch(`/comments/${comment.id}`), //has no cursor
    //     enabled:false
    // })

    // if (showReplyQuery.isLoading) return ("loading") //TODO move this down belwo
    // if (showReplyQuery.isError) return ("blah blah") //Move this down below to the replies part


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
                </p>
                {comment.childComment.length>0 &&
                    showReplies?
                    <p onClick={()=>{setShowReplies(false)}}>
                        <IconMessages/> Hide replies
                    </p>
                        :
                    <p onClick={()=>{
                        if(!data) fetchNextPage();
                        setShowReplies(true);
                    }}>
                        <IconMessages/> show replies
                    </p> 
                }
                <p><IconMessage/> reply</p> 
                         
            </div>
            {data && showReplies &&
                <div className="group-replies">
                    {data.pages.map((group,i)=>(
                        <Fragment key={i}>
                            {group.replies.map(reply=>(
                                <ReplyCard
                                    comment={reply}
                                    key={reply.id}
                                />
                            ))}
                        </Fragment>
                    ))}
                </div>
            }

            {isFetchingNextPage? 
                <p>Loading..</p>:
            hasNextPage &&  showReplies && <p onClick={()=>fetchNextPage()}>Load more</p>
            }


        </div>
    );
}
 
export default CommentCard;


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
