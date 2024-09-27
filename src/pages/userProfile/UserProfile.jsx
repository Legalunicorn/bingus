import { useNavigate, useParams } from "react-router-dom";
import "./userProfile.scss"
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
import PostCard from "../../components/postCard/PostCard";
import BackNav from "../../components/backNav/BackNav"
import ProfileStats from "../../components/profileStats/ProfileStats";
const VITE_DEFAULT_PFP = import.meta.env.VITE_DEFAULT_PFP;

const UserProfile = () => {

    //TODO implement infinite scroll after its implemented for home page
    //TODO must fetch whether the user is following this profile or not!
    const navigate = useNavigate();
    const { userId } = useParams();
    const myFetch = useFetch();
    const getUser = async ({ queryKey }) => {
        console.log("Passing ID:", queryKey)
        return await myFetch(`/users/${queryKey[1]}`);
    }

    const {
        data,
        isError,
        isPending
    } = useQuery({
        queryKey: ['user', userId,"post"], //Post for invalidate Liking
        queryFn: getUser
    })

    if (isPending) return (<>hi</>);
    console.log("data is",data);
    //TODO 
    const { user } = data; //for easier 
    console.log("user prof",user)
    // const {user} =test;


    return (
        <div className="content user-profile-page">

            <div> 
                {isPending ? <p>Loading profile</p> :
                    <>
                        <BackNav
                            label="User"
                        />
                        <div className="profile-main">
                            
                            {user?.profile?.profilePicture ?
                                <img src={user.profile.profilePicture} />
                                :
                                <img src={VITE_DEFAULT_PFP} />
                            }
                            <div>
                                <p className="profile-username">{user.username}</p>
                                <p className="profile-displayname">{user.displayName}</p>
                                <ProfileStats
                                    followers={user._count.followers}
                                    following={user._count.following}
                                    posts={user._count.posts}
                                />
                                {user.isBeingFollowed?
                                    <button >Unfollow</button>:
                                    <button >Follow</button>
                                }
                            </div>
                        </div>
                        <div className="profile-details">
                            {user?.profile?.bio &&
                                <div>
                                    {/* <span className="profile-label">Bio</span> */}
                                    <p className="profile-bio">{user.profile.bio}</p>
                                </div>
                            }
                            {user?.profile?.website &&
                                <div>
                                    <IconWorld />
                                    <a href={`//${user.profile.website}`} target="_blank">{user.profile.website}</a>
                                </div>
                            }
                            {
                                user?.profile?.github &&
                                <div>
                                    <IconBrandGithub />
                                    <a target="_blank"
                                        href={`//${user.profile.github}`}
                                    >github</a>
                                </div>
                            }
                            <a href=""></a>
                        </div>
                        <div className="profile-posts">
                            <p>Posts</p>
                            {user.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    handleClick={() => (navigate(`/p/posts/${post.id}`))}
                                    pageQueryKey={['user', userId,"post"]}
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



export default UserProfile;



//Sample API data
const test = {
    "user": {
        "id": 2,
        "displayName": "User 0",
        "username": "Bingus2",
        "createdAt": "2024-08-18T12:57:46.458Z",
        "followers": [
            {
                "followingId": 2,
                "followerId": 1,
                "createdAt": "2024-08-20T12:37:53.753Z"
            }
        ],
        "_count": {
            "followers": 1,
            "following": 1
        },
        "profile": {
            "website": "www.lame.com",
            "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png",
            "github": "www.gh.com"
        },
        "posts": [
            {
                "id": 11,
                "body": "updated post",
                "gitLink": "urmum.com",
                "repoLink": "urdad.com",
                "attachment": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724135445/bingus/lfcotrotv4suyscncdew.png",
                "public_id": "bingus/lfcotrotv4suyscncdew",
                "createdAt": "2024-08-20T06:30:45.713Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 1,
                    "comments": 8
                },
                "tags": [
                    {
                        "name": "tag1"
                    },
                    {
                        "name": "tag2"
                    }
                ],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 20,
                "body": "This post was created by the frontend. This is text only",
                "gitLink": null,
                "repoLink": null,
                "attachment": null,
                "public_id": null,
                "createdAt": "2024-09-03T14:00:49.838Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 12,
                "body": "Id 12 from BINGUS",
                "gitLink": "https://github.com/Legalunicorn/bingus-api",
                "repoLink": "https://github.com/Legalunicorn/bingus-api",
                "attachment": null,
                "public_id": null,
                "createdAt": "2024-08-20T08:18:25.869Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [
                    {
                        "name": "tag1"
                    },
                    {
                        "name": "tag5"
                    }
                ],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 13,
                "body": "Id 12 from BINGUS",
                "gitLink": "https://github.com/Legalunicorn/bingus-api",
                "repoLink": "https://github.com/Legalunicorn/bingus-api",
                "attachment": null,
                "public_id": null,
                "createdAt": "2024-08-20T08:20:05.350Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [
                    {
                        "name": "tag1"
                    },
                    {
                        "name": "tag5"
                    }
                ],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 21,
                "body": "This is with a tag",
                "gitLink": null,
                "repoLink": null,
                "attachment": null,
                "public_id": null,
                "createdAt": "2024-09-03T14:04:14.197Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [
                    {
                        "name": "tag,tag1,bingus"
                    }
                ],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 28,
                "body": "Black man",
                "gitLink": null,
                "repoLink": null,
                "attachment": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1725426192/bingus/qahympsh6pwjibyjdhu6.jpg",
                "public_id": "bingus/qahympsh6pwjibyjdhu6",
                "createdAt": "2024-09-04T05:03:12.919Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [
                    {
                        "name": "nigerian"
                    },
                    {
                        "name": "handsome"
                    }
                ],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 23,
                "body": "This is with a git link",
                "gitLink": "www.github.com/LegalUnicorn/bingus-api",
                "repoLink": null,
                "attachment": null,
                "public_id": null,
                "createdAt": "2024-09-03T14:09:52.518Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [
                    {
                        "name": "test"
                    },
                    {
                        "name": "git"
                    }
                ],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 22,
                "body": "Tested with new tags",
                "gitLink": null,
                "repoLink": null,
                "attachment": null,
                "public_id": null,
                "createdAt": "2024-09-03T14:06:49.739Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [
                    {
                        "name": "tags1"
                    },
                    {
                        "name": "skibid"
                    },
                    {
                        "name": "toielt"
                    }
                ],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            },
            {
                "id": 14,
                "body": "frick",
                "gitLink": null,
                "repoLink": null,
                "attachment": null,
                "public_id": null,
                "createdAt": "2024-08-20T08:20:33.849Z",
                "nextPostId": null,
                "userId": 2,
                "_count": {
                    "likes": 0,
                    "comments": 0
                },
                "tags": [],
                "author": {
                    "id": 2,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                }
            }
        ]
    }
}