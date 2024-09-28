//Like unlike comment 

import {useMutation, useQueryClient} from "@tanstack/react-query"
import { useFetch } from "./useFetch"


//Comments wuery only exist in one query for now
//this is within the post

/**
 * Strictly for comment cards, reply cards will have their seperate functions 
 * @param {*} comment -> props from comment card
 * @param {*} postId 
 * @returns 
 */
const useCommentMutation = (comment,postId) =>{ //postId sufficient to get QueryKey
    const queryClient = useQueryClient();
    const myFetch = useFetch();
    const queryKey = ['post',postId.toString()] //All comments live inside the post page query
    // console.log(queryKey)
    


    const createMutation = (mutationFn,updateFn) => useMutation({
        mutationFn,
        onMutate:async()=>{
            //same as post. 
            //1. cancel related queries 
            await queryClient.cancelQueries(queryKey);
            //2. get the data before optimistic update
            const rollback = queryClient.getQueryData(queryKey);
            //3. manually update cache before mutation function
            console.log("sss",queryClient.getQueryData(queryKey))
            queryClient.setQueryData(queryKey,(prev)=>{ //we dont need a function to find the specific query because comments only live in one query
                return {
                    post:{
                        ...prev.post,
                        comments: prev.post.comments.map(c=>c.id===comment.id?updateFn(c):c) //update the comment if needed
                    }
                }
            })
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
            queryClient.invalidateQueries(queryKey,{exact:true});

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