//for unfollow as well
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "./useFetch";
const useFollowMutation = (user, queryKey) => {
  const queryClient = useQueryClient();
  const myFetch = useFetch();

  const updateData = (data, updateFn) => {
    const checkBeforeUpdate = (u) => (u.id !== user.id ? u : updateFn(u));
    if (!data) return; //no cache;
    if (data.user) {
      //directly has the user
      return {
        ...data,
        user: updateFn(data.user),
      };
    } else if (data.new_users && data.top_users) {
      //feed
      return {
        ...data,
        new_users: data.new_users.map(checkBeforeUpdate),
        top_users: data.top_users.map(checkBeforeUpdate),
      };
    } //TODO add check for list of followers/following when this is implementined. Update: will not implement list of followers
    else return data;
  };
  const createMutation = (mutationFn, updateFn) =>
    useMutation({
      mutationFn,
      onMutate: async () => {
        //cancel queries
        await queryClient.cancelQueries(queryKey);
        //get rollback
        const rollback = queryClient.getQueryData(queryKey);
        //update prev
        queryClient.setQueryData(queryKey, (data) =>
          updateData(data, updateFn),
        );
        //return rollback
        return { rollback };
      },
      onError: (error, variables, context) => {
        console.log(error);
        if (context.rollback)
          queryClient.setQueryData(queryKey, context.rollback);
        else console.log("Missing rollback");
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    });
  const follow = createMutation(
    () => myFetch(`/users/${user.id}/follow`, { method: "POST" }),
    (user) => ({
      ...user,
      followers: [true],
      _count: user._count
        ? {
            ...user._count,
            followers: user._count.followers + 1,
          }
        : user._count, //undefined
    }),
  );
  const unfollow = createMutation(
    () => myFetch(`/users/${user.id}/unfollow`, { method: "POST" }),
    (user) => ({
      ...user,
      followers: [],
      _count: user._count
        ? {
            ...user._count,
            followers: user._count.followers - 1,
          }
        : user._count, //undefined
    }),
  );

  return { follow, unfollow };
};

export default useFollowMutation;
