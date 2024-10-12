import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./editProfile.scss"
import { useFetch } from "../../hooks/useFetch";
import BackNav from "../../components/backNav/BackNav";
import { IconEdit } from "@tabler/icons-react";
import PostCard from "../../components/postCard/PostCard";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import ProfileInput from "./ProfileInput";
import ProfileStats from "../../components/profileStats/ProfileStats";
import Loader from "../../components/Loaders/Loader";

const EditProfile = () => {
    const MAX_FILE_SIZE = 1024*1024*6;
    const {user,dispatch} = useAuthContext();
    const myFetch = useFetch();
    const queryClient = useQueryClient();

    //States for all the editables
    const [attachment,setAttachment] = useState(null); //when they pick a new username
    const attachmentRef = useRef(null);
    const [editingField,setEditingField] = useState(); //ENUM: username,bio,website,github,displayName
    const [username,setUsername] = useState(user.username);
    const [bio,setBio] = useState(null);
    const [website,setWebsite] = useState(null);
    const [github,setGithub] = useState(null);
    const [displayname,setDisplayname]= useState(null);
    

    const fetchUser = async ()=>{
        return await myFetch(`/users/self/${user.id}`,{
            cache:"no-store"
        })
    }
    const fetchUpdateUser = async(data)=>{
        return await myFetch(`/users/${user.id}/profile`,{
            method:"PATCH",
            body:data
        },false)
    }

    const handleUpdateUser = async()=>{
        setEditingField("")
        const data = new FormData();
        data.append("username",username)
        data.append("displayname",displayname)
        data.append("bio",bio)
        data.append("website",website)
        data.append("github",github)
        if (attachment!=user.profilePicture){
            data.append("attachment",attachmentRef.current.files[0])
        }
        updateUserMutation.mutate(data)

        // return await myFetch(`/users/${user.id}/profile`,{
        //     method:"PATCH",
        //     body:data
        // },'isForm')
    }

    const updateUserMutation = useMutation({
        mutationFn:(variables)=>{
            return fetchUpdateUser(variables)
        },
        onSuccess:(newData)=>{
            toast.success("Profile Updated!")
            //Invalidate posts that show user Data
            queryClient.invalidateQueries('post')
            // queryClient.invalidateQueries('posts','profile')
            // queryClient.invalidateQueries('feed')
            dispatch({type:"UPDATE",payload:{
                username,
                profilePicture:newData.user.profile.profilePicture
            }})

        },
        onError:(error)=>{
            console.log(error);
            //Why did i do this??? //TODO remove if not needed
            // queryClient.invalidateQueries('posts','profile')
            toast.error(error.message);
        }
    })

    const {data,error,isPending,status} = useQuery({
        queryKey:['post','profile'], //mutate this when new post is created, as well as when profile mutated
        queryFn: fetchUser
    })


    useEffect(()=>{
        if (status==="success" && data?.user?.profile){
            const profile = data.user.profile
            // console.log("profile::",profile)
            setAttachment(profile.profilePicture)
            setBio(profile.bio);
            setWebsite(profile?.website || '');
            setGithub(profile?.github || '')
            setDisplayname(data.user.displayName)
        }
    },[status])
    const onChangeAttachment = (e)=>{
        if (e.target.files && e.target.files[0]){
            if (e.target.files[0].size>MAX_FILE_SIZE){
                toast.warn("File exceed 6mb");
            } else {
                setAttachment(URL.createObjectURL(e.target.files[0]));
            }
        }
    }
    


    // Render 
    // if (isPending) return(<>hi</>);
    const currUser =  (data && data.user)|| {};
    // console.log("Random check:");
    // console.log(attachment)
    // console.log(currUser.profile.profilePicture)
    // console.log(data.user)
    return (
        <div className="content user-profile-page self-profile">
            <div> 
                <BackNav label="Profile"/>
                {isPending 
                ? <Loader loading={isPending}/>
                :
                    <>
        
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
                                {user.username==="GuestUser"?
                                <p className="username-label">{user.username}</p>
                               : <ProfileInput
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
                                }
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
                                fieldLabel={"bio"}
                            />  
                            <ProfileInput
                                iconName="IconWorld"
                                fieldState={website}
                                fieldName='website'
                                editingField={editingField}
                                setEditingField={setEditingField}
                                setField={setWebsite}
                                fieldLabel={"website"}
                            />                        
                            <ProfileInput
                                iconName="IconBrandGithub"
                                fieldState={github}
                                fieldName='github'
                                editingField={editingField}
                                setEditingField={setEditingField}
                                setField={setGithub}
                                fieldLabel={"github"}
                            />
                            
                        </div>
                        
                        <div className="save">
                        <button 
                            disabled={updateUserMutation.isPending}
                            className="save-changes"
                            onClick={handleUpdateUser}
                        >
                            Save Changes
                        </button>
                        {updateUserMutation.isPending && <Loader loading={updateUserMutation.isPending}/>}
                        </div>
                        <div className="profile-posts">
                            <p>Posts</p>
                            {currUser.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    handleClick={() => (navigate(`/p/posts/${post.id}`))}
                                    pageQueryKey={['post','profile']}
                                />
                            ))}
                        </div>
                    </>

                }
            </div>
            <div>
                {/* side_contents */}
            </div>
        </div>
    );
}
 
export default EditProfile;