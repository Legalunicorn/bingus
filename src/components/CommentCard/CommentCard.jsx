const CommentCard = ({comment}) => {
    return (
        <div className="parent-comment-card">
            <p>{comment.body}</p>
        </div>
    );
}
 
export default CommentCard;

//can receive a child comment 