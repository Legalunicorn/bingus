import { Form, useParams } from "react-router-dom";
import "./viewPost.scss"
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import PostCard from "../../components/postCard/PostCard";
import { IconArrowLeft, IconSend2 } from "@tabler/icons-react";
import CommentCard from "../../components/CommentCard/CommentCard";
import BackNav from "../../components/backNav/BackNav";
import CreateComment from "../../components/createComment/CreateComment";

const ViewPost = () => {
    const {user} = useAuthContext()
    const {postId} = useParams();
    const getPost = useFetch()
    const postQuery = useQuery({
        queryKey: ["post",postId],
        queryFn: ()=>getPost(`/posts/single/${postId}`)
    })

    if (postQuery.isLoading) return ("Loading") //TODO proper loading
    if (postQuery.isError) return (<p>{postQuery.error.message}</p>
    ) //TODO proper error

    //TODO fi

    const {post} = postQuery.data;
    return (
        <div className="content view-post">
            <div>
                <BackNav label="Post"/>
                <PostCard
                    post={post}
                />
                <CreateComment
                    postId={post.id}
                />

                <p>View comments ({post.comments?post.comments.length: 0})</p>
                <div className="comment-section">
                    {post.comments && post.comments.map(comment=>(
                        <CommentCard comment={comment} key={comment.id}/>
                    ))}
                </div>
            </div>
            <div>
                what the sigma
            </div>

        </div>
    );
}
 
export default ViewPost;