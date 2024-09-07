import { IconBrandGithub, IconCheck, IconEdit, IconWorld } from "@tabler/icons-react";
import "./editProfile.scss"
// import TextareaAutosize from "react-textarea-autosize";

const ProfileInput = ({
    iconName,
    fieldState,
    fieldName,
    editingField,
    setEditingField,
    setField, //ie. setGithub,
    className,
    maxLength,
    minLength,
    pattern,
    title,
    inputType='input'

}) => {
    const InputComponent = inputType;
    return (
        <div className="edit-input">
            {iconName=='IconBrandGithub'&& <IconBrandGithub/>}
            {iconName=='IconWorld'&& <IconWorld/>}
            {editingField===fieldName?
            <>
                <InputComponent
                    type={inputType===null ? undefined :'text'}
                    onChange={e=>{setField(e.target.value)}}
                    className={className || "profile-bio"} //standard name
                    value={fieldState}
                    maxLength={maxLength || undefined}
                    minLength={minLength || undefined}
                    pattern={pattern || undefined}
                    title={title ||undefined} 
                    // {maxLength && maxLength={maxLength}}
                />
                <IconCheck onClick={()=>setEditingField('')}/>
            </>
            :
            <>
                <p className={className || 'profile-bio'}>{fieldState}</p>
                <IconEdit onClick={()=>setEditingField(fieldName)}/>
            </>
            }
        </div>
    );
}
 
export default ProfileInput;


{/* <div className="edit-input">
<IconBrandGithub />
{editingField==="github"?
<>
    <input
        type="text"
        onChange={(e)=>{setGithub(e.target.value)}}
        value={github}
        className="profile-github"
    />
    <IconCheck onClick={()=>setEditingField('')}/>
</>
:
<>
    <p className="profile-github">{github}</p>
    <IconEdit onClick={()=>{setEditingField('github')}}/>
</>
}
</div> */}