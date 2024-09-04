import { Form, useParams } from "react-router-dom";
import "./viewPost.scss"
import { useQuery } from "@tanstack/react-query";
import { myFetch } from "../../utils/myFetch";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import PostCard from "../../components/postCard/PostCard";
import TextareaAutosize from "react-textarea-autosize";
import { IconArrowLeft, IconSend2 } from "@tabler/icons-react";
import CommentCard from "../../components/CommentCard/CommentCard";
import BackNav from "../../components/backNav/BackNav";

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

    //TODO fi

    
    const {post} = postQuery.data;
    console.log(post);


    return (
        <div className="content view-post">
            <div>
                <BackNav label="Post"/>
                <PostCard
                    post={post}
                />
                
                <Form>
                    <TextareaAutosize
                        className="textarea"
                        placeholder="Type a comment.."

                    />
                    <button>Post</button>
                </Form>
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