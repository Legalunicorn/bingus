import "./likeFeed.scss"
import { useFetch } from "../../hooks/useFetch";
import PostCard from "../../components/postCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import BackNav from "../../components/backNav/BackNav";
const LikeFeed = () => {


    //use react query

    const myFetch = useFetch();
    const {data,isLoading,isError} = useQuery({
        queryKey:['like-feed'],
        queryFn: ()=>myFetch('/posts/likes')
    })

    if (isLoading) return <>Loading</>
    if (isError) return <>Error</>



    return (
        <>
        <div className="content like-feed">
            <div className="like-feed">
                <BackNav label="Liked Posts"/>

                {data.posts.length>0
                ?data.posts.map(post=>(
                    <PostCard
                        key={post.id}
                        post={post}
                        pageQueryKey={['like-feed']}
                    />
                ))
                :<p className="null-res">No liked posts</p>

            }
            </div>
            <div>
            
            </div>
        </div>

        </>
    );
}
 
export default LikeFeed;