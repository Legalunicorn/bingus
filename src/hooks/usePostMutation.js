/*
Update like state
Got hint from claude unfortunately. couldnt figure a way around this
*/
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "./useFetch";

const usePostMutation = (post, queryKey) => {
  const queryClient = useQueryClient();
  const myFetch = useFetch();
  const updatePostInCache = (prev, updateFn) => {
    //#3 layer being called
    //updatePost -> function for posts in an array
    //updateFn -> update a single post
    const updatePost = (p) => (p.id === post.id ? updateFn(p) : p);
    if (!prev) {
      // console.log("No prev");
      return;
    }
    //############### Home Feed ###############
    if (prev.new_post && prev.new_follower_posts) {
      return {
        ...prev,
        new_post: prev.new_post.map(updatePost).filter((p) => p !== null),
        new_follower_posts: prev.new_follower_posts
          .map(updatePost)
          .filter((p) => p !== null),
      };
    }
    //############### Profile feed || Edit Profile  ############### (same structure)
    if (prev.user && prev.user.posts) {
      //Profile Feed
      return {
        ...prev,
        user: {
          ...prev.user,
          posts: prev.user.posts.map(updatePost).filter((p) => p !== null),
        },
      };
    }
    if (prev.posts) {
      return {
        ...prev,
        posts: prev.posts.map(updatePost).filter((p) => p !== null),
      };
    }
    //############### View post  ###############
    if (prev.post) return { ...prev, post: updateFn(post) };

    //Somehow none of the above, we dont update the cahce
    return prev;
  };

  const createMutation = (mutationFn, updateFn) =>
    useMutation({
      //#2 layer being called
      mutationFn,
      onMutate: async () => {
        //Optimistic update segment

        //cancel quereies, get prev cache
        await queryClient.cancelQueries(queryKey); //cancel feed in page
        const rollback = queryClient.getQueryData(queryKey);
        //update cache munually
        queryClient.setQueryData(queryKey, (prev) =>
          updatePostInCache(prev, updateFn),
        );
        //return rollback
        return { rollback };
      },
      onError: (error, variables, context) => {
        // console.log("Error in post mutation: ",error);
        if (context.rollback)
          queryClient.setQueriesData(queryKey, context.rollback);
        else console.log("No roll back!");
        //roll back if needed
      },
      onSettled: () => {
        if (queryKey[0] !== "like-feed")
          queryClient.invalidateQueries(queryKey); //
      },
    });

  // #1 layer being called
  const likePost = createMutation(
    //takes in mutationFn, updateFn
    //README massive bug that took me 2 days to solve
    // i wrapped my myFetch in curly braces, and so it was NOT RETURNED
    //For some reason this caused the onSettled to run even when the mutation is NOT DONE
    // because the return is void, and return is immediately undefined
    // useMutation calls onSettled
    // query get refetches
    () => myFetch(`/posts/${post.id}/like`, { method: "POST" }),
    (post) => ({
      ...post,
      likes: [true],
      _count: { ...post._count, likes: post._count.likes + 1 },
    }),
  );

  const unlikePost = createMutation(
    //takes in mutationFn, updateFn
    () => myFetch(`/posts/${post.id}/unlike`, { method: "POST" }),
    (post) => ({
      ...post,
      likes: [],
      _count: { ...post._count, likes: post._count.likes - 1 },
    }),
  );

  const deletePost = createMutation(
    () => myFetch(`/posts/${post.id}`, { method: "DELETE" }),
    (post) => null, //return nothing
  );

  return { likePost, unlikePost, deletePost };
};

export default usePostMutation;
