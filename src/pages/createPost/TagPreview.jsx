import { IconX } from "@tabler/icons-react";
import "./tagPreview.scss"
const TagPreview = ({name,deleteTag}) => {
    return (
        <div className="tag-preview">
            <p>{name}</p>
            <IconX onClick={()=>{deleteTag(name)}}/>
        </div>
    );
}
 
export default TagPreview;