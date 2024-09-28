//Like unlike comment 

import {useMutation, useQueryClient} from "@tanstack/react-query"
import { useFetch } from "./useFetch"

const useCommentMutation = (comment,postId,refetch) =>{ //postId sufficient to get QueryKey
    const queryClient = useQueryClient();
    const myFetch = useFetch();
    const queryKey = comment.parentCommentId!==null? ["replies",comment.parentCommentId] : ['post',postId.toString()]


    const updateCommentCache = (prev,updateFn)=>{
        //Check if there is a parent comment ID 
        if (comment.parentCommentId===null){
            return { 
                post:{
                    ...prev.post,
                    comments:prev.post.comments.map(c=>c.id===comment.id?updateFn(c):c)
                }
            }
        } else { //Reply //README, i mightve wasted my time on this..LOL. replies are inside their 
            return{
                pages: prev.pages.map(page=>
                    ({...page,
                        replies:page.replies.map(reply=>reply.id===comment.id?updateFn(reply):reply)
                    })
                ),
                pageParams:prev.pageParams   
            }

        }

    };

    const createMutation = (mutationFn,updateFn) => useMutation({
        mutationFn,
        onMutate:async()=>{
            //same as post. 
            console.log("mutation key: ",queryKey)
            await queryClient.cancelQueries(queryKey);
            const rollback = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey,(prev)=>updateCommentCache(prev,updateFn))

            return {rollback}

        },
        onError:(error,variables,context)=>{
            console.log("Error with useCommentMutation:",error);
            //roll back optimistic updates
            if (context && context.rollback) queryClient.setQueryData(queryKey,context.rollback)
            else console.log("Roll back empty");
            return;
        
        },
        onSettled:()=>{
            //Infinite queries cannot be invalidated, so we must refetch
            if (queryKey[0]==='post'){
                queryClient.invalidateQueries(queryKey)
            } else{
                refetch();
            }
        },
    })

    const likeComment = createMutation(
        ()=>myFetch(`/comments/${comment.id}/like`,{method:"POST"}),
        (comment)=>{ //update function. takes in a post a
            return {
                ...comment,
                likes:[true], //non empty array denotes liked. honeslty a boolean is a better fit but its fine
                _count:{...comment._count,likes:comment._count.likes+1}
            }
        }
    )

    const unlikeComment = createMutation(
        ()=>myFetch(`/comments/${comment.id}/unlike`,{method:"POST"}),
        (comment)=>{ //update function. takes in a post a
            return {
                ...comment,
                likes:[], //empty array denotes not liked
                _count:{...comment._count,likes:comment._count.likes-1}
            }
        }
    )
    return {likeComment,unlikeComment}

}

export default useCommentMutation