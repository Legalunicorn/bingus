import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./editProfile.scss"
import { useFetch } from "../../hooks/useFetch";
import BackNav from "../../components/backNav/BackNav";
import { IconBrandGithub, IconCheck, IconEdit, IconSquareRoundedCheck, IconWorld } from "@tabler/icons-react";
import PostCard from "../../components/postCard/PostCard";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import ProfileInput from "./ProfileInput";
import ProfileStats from "../../components/profileStats/ProfileStats";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;

const EditProfile = () => {
    const MAX_FILE_SIZE = 1024*1024*6;
    const {user} = useAuthContext();
    const myFetch = useFetch('/');

    //States for all the editables
    const [attachment,setAttachment] = useState(user.profilePicture); //when they pick a new username
    const attachmentRef = useRef(null);
    const [editingField,setEditingField] = useState(); //ENUM: username,bio,website,github,displayName
    const [username,setUsername] = useState(user.username);
    const [bio,setBio] = useState(null);
    const [website,setWebsite] = useState(null);
    const [github,setGithub] = useState(null);
    const [displayname,setDisplayname]= useState(null);
    

    const fetchUser = async ()=>{
        return await myFetch(`/users/profile/${user.id}`)
    }

    const {data,error,isPending,status} = useQuery({
        queryKey:['posts','profile'], //mutate this when new post is created, as well as when profile mutated
        queryFn: fetchUser
    })
    useEffect(()=>{
        if (status==="success" && data?.user?.profile){
            const profile = data.user.profile
            console.log("profile::",profile)
            setBio(profile.bio);
            setWebsite(profile?.website || '');
            setGithub(profile?.github || '')
            setDisplayname(data.user.displayName)
            //ProfilePicture + Username is already set 
        }
    },[status])
    const onChangeAttachment = (e)=>{
        if (e.target.files && e.target.files[0]){
            if (e.target.files[0].size>MAX_FILE_SIZE){
                toast.warm("File exceed 6mb");
            } else {
                setAttachment(URL.createObjectURL(e.target.files[0]));
            }
        }
    }


    // Render 
    if (isPending) return(<>hi</>);
    const currUser = data.user;
    // console.log(data.user)
    return (
        <div className="content user-profile-page self-profile">
            <div> 
                {isPending ? <p>Loading profile</p> :
                    <>
                        <BackNav
                            label="Profile"
                        />
                        <div className="profile-main">
                        
                            <div className="editable-pfp">
                                <img src={attachment} />
                                <label htmlFor="attachment">
                                    <IconEdit />
                                </label>
                                <input 
                                    ref={attachmentRef}
                                    type="file" 
                                    id="attachment" 
                                    name="attachment"
                                    onChange={onChangeAttachment}
                                    accept=".png, .jpeg, .jpg, .gif"
                                />
                            </div>
                            <div>

                                <ProfileInput
                                    fieldState={username}
                                    fieldName='username'
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    setField={setUsername}
                                    className="input-for-edit profile-username"
                                    maxLength="25"
                                    minLength="2"
                                    pattern="^[a-zA-Z0-9_.]*$"
                                    title="Username must be alphanumeric, and may contain periods, understore, and hypens"
                                />
                                <ProfileInput
                                    fieldState={displayname}
                                    fieldName='displayname'
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    setField={setDisplayname}
                                    className="profile-displayname"
                                />
                                <ProfileStats
                                    followers={currUser._count.followers}
                                    following={currUser._count.following}
                                    posts={currUser._count.posts}
                                />
                            </div>
                        </div>


                        <div className="profile-details">
                            
                            <ProfileInput
                                fieldState={bio}
                                fieldName='bio'
                                editingField={editingField}
                                setEditingField={setEditingField}
                                setField={setBio}
                                inputType={TextareaAutosize}
                            />  
  
                            <ProfileInput
                                iconName="IconWorld"
                                fieldState={website}
                                fieldName='website'
                                editingField={editingField}
                                setEditingField={setEditingField}
                                setField={setWebsite}
                            />                        
                            <ProfileInput
                                iconName="IconBrandGithub"
                                fieldState={github}
                                fieldName='github'
                                editingField={editingField}
                                setEditingField={setEditingField}
                                setField={setGithub}
                            />
                            
                        </div>
                        <button 
                            className="save-changes"
                        >
                            Save Changes
                        </button>
                        <div className="profile-posts">
                            <p>Posts</p>
                            {currUser.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    handleClick={() => (navigate(`/p/posts/${post.id}`))}
                                />
                            ))}
                        </div>
                    </>

                }
            </div>
            <div>
                side_contents
            </div>
        </div>
    );
}
 
export default EditProfile;