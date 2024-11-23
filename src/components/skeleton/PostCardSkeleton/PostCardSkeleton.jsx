import { IconHeart, IconMessageCircle } from "@tabler/icons-react";





const PostCardSkeleton = () => {
    //Copying structure from our postcard component
    return (
        <div className="postcard">
            <div className="post-header">
                <img className="skeleton" src="" alt="" />
                <span className="skeleton skeleton-text-medium"></span>
                <span className="">•</span>
                <span className="written-time skeleton skeleton-text-short"></span>
            </div>


            <div className="post-body">
                <div className="">
                    <p className="skeleton skeleton-line"></p>
                    <p className="skeleton skeleton-line"></p>
                </div>
                <p className="post-tags">
                    {/* <span className="skeleton">hi</span>
                    <span className="skeleton"></span> */}
                </p>
            </div>
            <div className="post-buttons">
                <p>
                    <p className="skeleton skeleton-text-ultra-short"></p>
                    
                </p>
                <p>
                    <p className="skeleton skeleton-text-ultra-short"></p>
                </p>

            </div>
        </div>

    );
}

export default PostCardSkeleton;