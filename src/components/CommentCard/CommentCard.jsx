import { formatDistanceToNowStrict } from "date-fns";
import "./commentCard.scss"
import { IconHeart, IconHeartFilled, IconMessage, IconMessages } from "@tabler/icons-react";
import { useState,Fragment } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReplyCard from "../ReplyCard/ReplyCard";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;
import { Form } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import useCommentMutation from "../../hooks/useCommentMutation";


/*
How to post new reply?
> click on reply
> input box appears
// > send input, use mutation??
    -> if all the replies are loaded
    -> 

 */
const CommentCard = ({comment,postId}) => {
    const written_time = formatDistanceToNowStrict(new Date(comment.createdAt));
    const [showReplies,setShowReplies] = useState(false);
    const [showInput,setShowInput] = useState(false);
    const [input,setInput] = useState('');
    const queryClient = useQueryClient();
    // const {likeComment,unlikeComment} = useCommentMutation(comment,postId);
    //TODO differentiate between show replies and show more

    const myFetch = useFetch();
    const fetchReplies = async({pageParam})=>{
        // console.log("FETCH REPLIES CID::",pageParam)
        return await myFetch(`/comments/${comment.id}?cursorId=${pageParam}`)
    }
    const fetchPostReply = async()=>{
        return await myFetch('/comments',{
            method:"POST",
            body:JSON.stringify({
                parentComment:comment.id,
                body:input,
                postId
            })
        })
    }

    const createReplyMutation = useMutation({
        mutationFn: fetchPostReply,
        onSuccess: ()=>{
            refetch();
            queryClient.invalidateQueries(['post',postId])
            setShowInput(false);
            setInput('');
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })

    const handleSubmitReply = (e)=>{
        e.preventDefault();
        createReplyMutation.mutate();
    }


    

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching, //TODO figure out where to use this?
        isFetchingNextPage,
        status,
        refetch
    } = useInfiniteQuery({
        queryKey:['replies',comment.id], //this is PARENt COMMENT ID
        queryFn: fetchReplies,
        initialPageParam: -1,
        getNextPageParam: (prevData)=>prevData.cursorId,
        enabled:false,
    })
    // console.log("type",typeof refetch);
    const {likeComment,unlikeComment} = useCommentMutation(comment,postId);
    if (status=='error') console.log(error); //TODO clean up
    if (status=='error') return (<p>{error.message}</p>)

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

                {comment.childComment.length>0? 
                    showReplies?
                    <p onClick={()=>{setShowReplies(false)}}>
                        <IconMessages/> Hide replies
                    </p>
                        :
                    <p onClick={()=>{
                        if(!data) fetchNextPage();
                        setShowReplies(true);
                        setShowInput(false);
                    }}>
                        <IconMessages/> show replies
                    </p> 
                    :
                    <></>
                }

                <p onClick={()=>setShowInput(prev=>!prev)}
                ><IconMessage/> reply</p> 
                         
            </div>

            {showInput && //refactor user-profile to its own component!
                <>
                <Form onSubmit={handleSubmitReply}>
                    <TextareaAutosize
                        required
                        className="reply-comment"
                        placeholder="Add a reply..."
                        onChange={(e)=>{setInput(e.target.value)}}
                        value={input}
                    />
                    <button type="submit">reply</button>
                </Form>                
                </>

            }
            {data && showReplies &&
                <div className="group-replies">
                    {data.pages.map((group,i)=>(
                        <Fragment key={i}>
                            {group.replies.map(reply=>(
                                <ReplyCard
                                    comment={reply}
                                    key={reply.id}
                                    refetch={refetch}
                                />
                            ))}
                        </Fragment>
                    ))}
                </div>
            }

            {isFetchingNextPage? 
                <p className="loadmore">Loading..</p>:
            hasNextPage &&  showReplies && <p className="loadmore"onClick={()=>fetchNextPage()}>Load more</p>
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
