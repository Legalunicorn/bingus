/*
Update like state
Got hint from claude unfortunately. couldnt figure a way around this
*/
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useFetch} from "./useFetch"

const usePostMutation = (post,queryKey) =>{
    //both are passed from the post card


    const queryClient = useQueryClient();
    const myFetch = useFetch();
    const updatePostInCache = (prev,updateFn)=>{ //#3 layer being called 
        //updatePost -> function for posts in an array 
        //updateFn -> update a single post
        const updatePost = (p) => p.id===post.id? updateFn(p):p
        if (!prev){
            console.log("No prev");
            return;
        }
        //this is slightly complicated. how about i use the querykey to directly call the update function 
        //############### Home Feed ###############
        if (prev.new_post && prev.new_follower_posts) {
            return {
                ...prev,
                new_post: prev.new_post.map(updatePost),
                new_follower_posts: prev.new_follower_posts.map(updatePost)
            }
        }
        //############### Profile feed || Edit Profile (same structure) ###############
        if (prev.user && prev.user.posts){ //Profile Feed
            return {
                ...prev,
                user:{
                    ...prev.user,
                    posts:prev.user.posts.map(updatePost)
                }
            }
        }
        //############### View post  ###############
        if (prev.post) return {...prev,post:updateFn(post)}

        //Somehow none of the above, we dont update the cahce
        return prev

    }

    const createMutation= (mutationFn,updateFn) =>useMutation({  //#2 layer being called
        mutationFn,
        onMutate: async()=>{
            //cancel quereies, get prev cache
            await queryClient.cancelQueries(queryKey); //cancel feed in page
            const rollback = queryClient.getQueryData(queryKey);
            //update cache munually
            queryClient.setQueryData(queryKey,(prev)=>updatePostInCache(prev,updateFn))
            console.log("updated cache")
            //return rollback
            return {rollback}

        },
        onError:(error,variables,context)=>{
            console.log("Error in post mutation: ",error);
            if (context.rollback) queryClient.setQueriesData(queryKey,context.rollback)
            else console.log("No roll back!")
            //roll back if needed

        },
        onSettled:()=>{
            //invalidate all queries with posts using the 'post' key word
            console.log("INvaliding : ",queryKey)
            //I have no idea why this works
            //just dont touch it i guess? for some reason both invalite and refetch is needed
            //very messgyt
            
            queryClient.invalidateQueries(queryKey); //
            queryClient.refetchQueries(queryKey); //
        }
        
    })

    // #1 layer being called 
    const likePost  = createMutation( //takes in mutationFn, updateFn
        ()=>{myFetch(`/posts/${post.id}/like`,{method:"POST"})},
        (post)=>({
            ...post,
            likes:[true],
            _count:{...post._count,likes:post._count.likes+1}
        })

    )

    const unlikePost  = createMutation( //takes in mutationFn, updateFn
        ()=>{
            
            myFetch(`/posts/${post.id}/unlike`,{method:"POST"})
        },
        (post)=>({
            ...post,
            likes:[],
            _count:{...post._count,likes:post._count.likes-1}
        })

    )

    return {likePost,unlikePost}
}

export default usePostMutation