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
                                {editingField==="username"?
                                    <div className="edit-input">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e)=>{setUsername(e.target.value)}}
                                            required
                                            className="input-for-edit profile-username"
                                            maxLength="25"
                                            minLength="2"
                                            pattern="^[a-zA-Z0-9_.]*$"
                                            title="Username must be alphanumeric, and may contain periods, understore, and hypens"
                                        >
                                        </input>
                                        <IconCheck onClick={()=>setEditingField('')}/>
                                    </div>
                                    :
                                    <div className="edit-input">
                                    <p className="profile-username">{username}</p>
                                    <IconEdit onClick={()=>{setEditingField('username')}}/>                                    
                                    </div>
                                }
                                {editingField==="displayname"?
                                    <div className="edit-input">
                                    <input 
                                        className="profile-displayname"
                                        type="text"
                                        value={displayname}
                                        onChange={(e)=>{setDisplayname(e.target.value)}}
                                        maxLength="25"
                                    />
                                    <IconCheck onClick={()=>setEditingField('')}/>
                                    </div>
                                    :
                                    <div className="edit-input">
                                        <p className="profile-displayname">{displayname}</p>
                                        <IconEdit  size="16px"onClick={()=>{setEditingField('displayname')}}/> 
                                    </div>
                                }
                                <div className="stats">
                                    <div>
                                        <p>{currUser._count.followers}</p>
                                        <p>Followers</p>

                                    </div>
                                    <div>
                                        <p>{currUser._count.following}</p>
                                        <p>Following</p>

                                    </div>
                                    <div>
                                        <p>{currUser._count.posts}</p>
                                        <p>Posts</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="profile-details">
                            <div className="edit-input">
                                {editingField==="bio"?
                                <>
                                    <TextareaAutosize
                                    cacheMeasurement
                                        maxLength="150"
                                        value={bio}
                                        className="profile-bio"
                                        onChange={(e)=>{setBio(e.target.value)}}
                                    />
                                    <IconCheck onClick={()=>setEditingField('')}/>
                                </>
                                :
                                <>
                                    <p className="profile-bio">{bio}</p>
                                    <IconEdit onClick={()=>{setEditingField('bio')}}/>   
                                </>
                                }
                            </div>                            

                            {currUser?.profile?.website &&
                                <div>
                                    <IconWorld />
                                    <a href={`//${currUser.profile.website}`} target="_blank">{currUser.profile.website}</a>
                                </div>
                            }
                            {
                                currUser?.profile?.github &&
                                <div>
                                    <IconBrandGithub />
                                    <a target="_blank"
                                        href={`//${currUser.profile.github}`}
                                    >github</a>
                                </div>
                            }
                            
                        </div>
                        <button 
                            className="save-changes"
                        >Save Changes</button>
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
            <div> //side
                side_contents
            </div>
        </div>
    );
}
 
export default EditProfile;