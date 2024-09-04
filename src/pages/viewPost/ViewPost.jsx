import { useParams } from "react-router-dom";
import "./viewPost.scss"
import { useQuery } from "@tanstack/react-query";
import { myFetch } from "../../utils/myFetch";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";

const ViewPost = () => {
    const {user} = useAuthContext()
    const {postId} = useParams();
    const getPost = useFetch(`/posts/single/${postId}`)
    const postQuery = useQuery({
        queryKey: ["post",postId],
        queryFn: getPost
    })

    if (postQuery.isLoading) return ("Loading") //TODO proper loading
    if (postQuery.isError) return (<p>{postQuery.error.message}</p>
    ) //TODO proper error

    const {post} = postQuery.data;


    return (
        <div className="content view-post">
            <p>hi</p>
            <p>{post.id}</p>
            <p>{post.body}</p>
        </div>
    );
}
 
export default ViewPost;