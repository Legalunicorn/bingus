import ProfilePreviewSkeleton from "./ProfilePreviewSkeleton";

const MultipleProfilePreviewSkeleton = ({
    count=3,
    classes
}) => {
    
    return (  
        <>
        {Array.from({length:count}).map((_,i)=>
            <ProfilePreviewSkeleton key={i} classes={classes}/>
        )}
        </>

    );
}
 
export default MultipleProfilePreviewSkeleton;