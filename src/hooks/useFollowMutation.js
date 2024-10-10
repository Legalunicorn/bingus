//for unfollow as well
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useFetch } from "./useFetch";

//takes in the user as a structure to update
//queryKey needed? if follow from Feed ,the the feed refetches?
/*
flow is the same, in that it is optimistic updates
1. clic
2. immediate flip ui,then send request to backend
3. manually update the UI, either its a list of users or a user directly
4. yes, takes in query key afterall? 
*/
const useFollowMutation = (user,queryKey)=>{
    const queryClient = useQueryClient();
    const myFetch = useFetch();

    const updateData = (data,updateFn)=>{
        const checkBeforeUpdate = (u)=>u.id!==user.id? u: updateFn(u);
        if (!data) return; //no cache;
        if (data.user){//directly has the user
            return {
                ...data,
                user:updateFn(data.user)

            }
        } else if (data.new_users && data.top_users){ //feed
            return {
                ...data,
                new_users:data.new_users.map(checkBeforeUpdate),
                top_users:data.top_users.map(checkBeforeUpdate)
            }
        } //TODO add check for list of followers/following when this is implementined
        else return data;
    }
    const createMutation = (mutationFn,updateFn)=>useMutation({
        mutationFn,
        onMutate:async()=>{
            //cancel queries 
            await queryClient.cancelQueries(queryKey)
            //get rollback
            const rollback = queryClient.getQueryData(queryKey);
            //update prev
            queryClient.setQueryData(queryKey,data=>updateData(data,updateFn))
            //return rollback
            return {rollback}

        },
        onError:(error,variables,context)=>{
            console.log(error)
            //TODO reset roll back
            if (context.rollback) queryClient.setQueryData(queryKey,context.rollback) 
            else console.log("Missing rollback")
        },
        onSettled:()=>{
            //TODO invalidate queries in the page
            queryClient.invalidateQueries(queryKey)
        }
    })
    const follow = createMutation(
        ()=>myFetch(`/users/${user.id}/follow`,{method:"POST"}),
        (user)=>({
            ...user,
            followers:[true],
            _count: user._count 
                ?{
                    ...user._count,
                    followers:user._count.followers+1
                }
                :user._count //undefined

        })
    )
    const unfollow = createMutation(
        ()=>myFetch(`/users/${user.id}/unfollow`,{method:"POST"}),
        (user)=>({
            ...user,
            followers:[],
            _count: user._count 
                ?{
                    ...user._count,
                    followers:user._count.followers-1
                }
                :user._count //undefined

        })
    )

    return {follow,unfollow}
}

export default useFollowMutation