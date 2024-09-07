import { useState,useRef,useEffect } from "react"
import { useMutation,useQueryClient } from "@tanstack/react-query";
import "./createPost.scss"
import { Form, useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ToastConfig from "../../components/toasts/ToastConfig";
import TagPreview from "./TagPreview";
import { IconAlertOctagon, IconBrandGithub, IconPaperclip, IconTagsFilled, IconX } from "@tabler/icons-react";
import { myFetch } from "../../utils/myFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
const CreatePost = () => {
    const {user} = useAuthContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [text,setText] = useState("");
    const [error,setError] = useState(""); //client side error
    const [tags,setTags] = useState([]);
    const [tag,setTag] = useState(""); //current input tag.
    const [git,setGit] = useState("");
    const [attachment,setAttachment] = useState(null);
    const [options,setOptions] = useState('tags'); //Tags, or GitHub
    const attachmentRef = useRef(null);
    const tagsRef = useRef(null);

    const MAX_FILE_SIZE = 1024*1024*6; //only 8MB allowed;

    useEffect(()=>{ //short cut to add tags
        document.addEventListener("keydown",handleAddTag)
        return ()=>{ //clean up function to remove when this page is not mounted
            document.removeEventListener("keydown",handleAddTag)
        }
        }
    ,[])

    const handleAddTag = (e) =>{
        //BUG enter no longer creaates a line in textbody, consider changing or leaving it
        // console.log(e.keyCode);
        if (e.keyCode===13){
            e.preventDefault();
            if (document.activeElement==tagsRef.current && tagsRef.current.value!=''){
                //first check if it exist already, dont allow duplicate tags
                const value = tagsRef.current.value.toLowerCase(); //tags are case insensitiveS
                if (!tags.includes(value)){
                    setTags(prevTags=>[...prevTags,value])
                    setTag("");
                }
            }
        }
    }
    const onAttachmentChange = (e) =>{
        if (e.target.files && e.target.files[0]){
            if (e.target.files[0].size>MAX_FILE_SIZE ){
                toast.warn("File exceeded 6mb")
            }
            else setAttachment(URL.createObjectURL(e.target.files[0]));
        }
    }
    const changeGit = (e)=>{
        setGit(e.target.value);
    }
    const changeTag = (e)=>{
        setTag(e.target.value);
    }

    const removeAttachment = ()=>{
        setAttachment(null); //remove preview;
        attachmentRef.current.value='';

    }
    const deleteTag = (name) =>{
        setTags(
            tags.filter(a=> a!=name)
        )
    }
    const handleChangeText = (e)=>{
        setText(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        data.append("body",e.target.body.value)
        console.log("BODY IS",e.target.body.value);
        if (attachment) data.append("attachment", e.target.attachment.files[0]); //attachment
        if (tags.length>0){
            tags.forEach(tag=>data.append("tags",tag))
        }
        if (git) data.append("gitLink",git)

        createPostMutation.mutate(data)
    }

    const createPostMutation = useMutation({
        mutationFn: (variables) =>{
            return myFetch("/posts",{
                method:"POST",
                body:variables
            },user,null) //dont set the content type 
        },
        onSuccess: ()=>{
            toast.success("Post created")
            queryClient.invalidateQueries(["feed"],{exact:true}) //refresh the feed
            navigate("/p/home")
        },
        onError:(error,variables,context)=>{
            console.log(error.message)
            toast.error(error.message)

        }
    })
    return (
        <div className="content new-post">
            
            <div> 
                <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <TextareaAutosize
                        onChange={handleChangeText}
                        className="textarea"
                        name="body"
                        required
                        maxLength="2000"
                        placeholder="Share whats happening.."
                    />
                    {attachment && 
                        <div className="media-container">
                            <img 
                                src={attachment} alt="Unknown file format"
                            />
                            <IconX
                                onClick={removeAttachment}
                            />
                        </div>

                    }
                    
                    <div className="tags">
                        {tags.map((tag,key)=>(
                            <TagPreview
                                key={key}
                                name={tag}
                                deleteTag={deleteTag}
                            />
                        ))}
                    </div>
                    <div className="form-options">
                        <div className="attachment-container">
                            <label htmlFor="attachment">
                                <IconPaperclip />
                            </label>
                            <input 
                                ref={attachmentRef}
                                type="file" 
                                id="attachment" 
                                name="attachment"
                                onChange={onAttachmentChange}
                                accept=".png, .jpeg, .jpg, .gif, .mp4, .avi, .mov, .wmv, .mkv, .webm"
                            />
                        </div>
                        
                        <IconTagsFilled
                            className={options=="tags"?"selected":''}
                            onClick={()=>{setOptions("tags")}}
                        />
                        <IconBrandGithub
                            className={options=="git"?"selected":''}
                            onClick={()=>{setOptions("git")}}
                        />
                        <p>{text.length}/2000</p>
                        <button disabled={createPostMutation.isPending} type="submit">Post</button>
                    </div>
                    {options=="tags" ?
                        <>
                            <p className="options-name">Tags:</p>
                            <input
                                ref={tagsRef}
                                text="text"
                                placeholder="Please Enter to push a new tag."
                                value={tag}
                                onChange={changeTag}
                            />
                        </>
                        :
                        <>
                            <p className="options-name">Post Repo (Optional):</p>
                            <input 
                                onChange={changeGit}
                                type="text" 
                                placeholder="Eg. www.github.com/user/project"
                                value={git}
                            />
                        </>

                    } 
                </Form>
                <p className="error-box">{
                error ? 
                    <>
                        <IconAlertOctagon size="18px"/>
                        {error}
                    </>:
                    ""
                }
            </p>
            {/* <ToastConfig/> */}
            </div>
            <div>

            </div>

        </div>
    );
}
export default CreatePost;