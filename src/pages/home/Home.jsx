//Home page . ie Feed
import { useState } from "react";
import "./home.scss"
import PostCard from "../../components/postCard/PostCard";
import ProfilePreview from "../../components/profilePreview/ProfilePreview";
import { useQuery } from "@tanstack/react-query";
import { myFetch } from "../../utils/myFetch";
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {

    const {user} = useAuthContext();
    const [feedSort,setFeedSort] = useState('recent') //or following
    


    const feedQuery = useQuery({
        queryKey:['feed'],
        queryFn: ()=>myFetch("/init",{},user)
    })
    
    if (feedQuery.isLoading) return ("loading")
    if (feedQuery.error) return ("error")

    const {new_post,new_follower_posts,new_users,top_users} = feedQuery.data;
    console.log("?",feedQuery.data)

    return (
        <div className="content" id="home-page">
            
            <div className="content-main">
                <div className="feed-options">
                    <span onClick={()=>setFeedSort('recent')} className={feedSort=='recent'?'selected':''}>Recent</span>
                    <span onClick={()=>setFeedSort('following')}  className={feedSort=='following'?'selected':''}>Following</span>
                </div>
                {feedSort=='recent'?
                new_post.map(post=>(
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))
                :
                new_follower_posts.map(post=>(
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))
                }
       
    

            </div>
            <div className="content-side">
                <div className="side-content-box">
                    <p>Latest users</p>
                        {new_users.map(user=>(
                            
                            <ProfilePreview  key={user.id} user={user}/>
                        ))}
                </div>
                <div className="side-content-box">
                    <p>Most followed</p>
                        {top_users.map(user=>(
                            
                            <ProfilePreview key={user.id} user={user}/>
                        ))}
                </div>
             
                Data loaders from data.side_contents 
                which //TODO api fetch to determine if these people have been followed or not
                <br />
                dsdf
                <br />
                dasdsadsadas
                <br />
                aiondaoda
                iasdassdaondaond
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo vero magni, modi impedit, maxime amet consequatur porro quas accusamus harum quo ea? Totam aut sapiente sequi incidunt necessitatibus nemo nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sit cupiditate eligendi hic neque, dolorum, incidunt consectetur perferendis saepe ipsa voluptatibus quaerat harum iure dicta rem maxime aperiam sapiente inventore! Ad corrupti atque hic incidunt, eligendi expedita laudantium ex odit nesciunt nisi voluptatem veritatis similique praesentium non quam sint error ut fugiat totam, quod quis, impedit corporis at eaque. Ratione quis amet illum aliquid neque tempora molestias, a rerum, perspiciatis laudantium eius, nesciunt recusandae numquam iure! Quo commodi deserunt minus ullam. Quaerat tenetur, quasi eaque voluptates officia incidunt. Necessitatibus, vel asperiores ipsum enim obcaecati vero iste cum. Reiciendis, repellendus fuga?
                
            </div>
        </div>


    );
}
 
export default Home;

const frick ={
    "content_side":{
        "new_users":[
                {
                    "id": 2,
                    "username": "skibididnponsenoslongahhusername",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                },
                {
                    "id": 20,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                },
                {
                    "id": 29,
                    "username": "Bingus2",
                    "displayName": "User 0",
                    "profile": {
                        "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                    }
                },                
        ],
        "top_users":[
            {
                "id": 28,
                "username": "Bingus2",
                "displayName": "User 0",
                "profile": {
                    "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                },
                "_count":{
                    "followers":0
                }
            },
            {
                "id": 27,
                "username": "Bingus2",
                "displayName": "User 0",
                "profile": {
                    "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                },
                "_count":{
                    "followers":0
                }
            },
            {
                "id": 42,
                "username": "Bingus2",
                "displayName": "User 0",
                "profile": {
                    "profilePicture": "https://res.cloudinary.com/ds80ayjp7/image/upload/v1724155844/bingus_pfp/u2gjzzipfko2bfheqkct.png"
                },
                "_count":{
                    "followers":0
                }
            },                
    ],        
    }
}

const mock = [{
    "id": 13,
    "body": "Never forget when Christina Aguilera presented this award to Eminem while they were beefing",
    "gitLink": "https://github.com/Legalunicorn/bingus-api",
    "repoLink": "https://github.com/Legalunicorn/bingus-api",
    "attachment": "-",
    "public_id": "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
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
}]

const idk = {
    "posts": [
        {
            "id": 14,
            "body": " oisdjfosij ofdsij oijf d    ",
            "gitLink": null,
            "repoLink": null,
            "attachment": "-",
            "public_id": "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
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
                "comments": 2
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
            "id": 7,
            "body": "Post With File Upload",
            "gitLink": null,
            "repoLink": null,
            "attachment": null,
            "public_id": null,
            "createdAt": "2024-08-18T14:19:01.342Z",
            "nextPostId": null,
            "userId": 1,
            "_count": {
                "likes": 0,
                "comments": 0
            },
            "tags": [],
            "author": {
                "id": 1,
                "username": "Bingus",
                "displayName": "User 0",
                "profile": null
            }
        },
        {
            "id": 6,
            "body": "Post with old and new tag",
            "gitLink": null,
            "repoLink": null,
            "attachment": null,
            "public_id": null,
            "createdAt": "2024-08-18T14:11:44.756Z",
            "nextPostId": 5,
            "userId": 1,
            "_count": {
                "likes": 0,
                "comments": 0
            },
            "tags": [
                {
                    "name": "tag0"
                },
                {
                    "name": "tag2"
                }
            ],
            "author": {
                "id": 1,
                "username": "Bingus",
                "displayName": "User 0",
                "profile": null
            }
        },
        {
            "id": 5,
            "body": "Post with Tags",
            "gitLink": null,
            "repoLink": null,
            "attachment": null,
            "public_id": null,
            "createdAt": "2024-08-18T14:11:17.806Z",
            "nextPostId": 4,
            "userId": 1,
            "_count": {
                "likes": 0,
                "comments": 0
            },
            "tags": [
                {
                    "name": "tag0"
                },
                {
                    "name": "tag1"
                }
            ],
            "author": {
                "id": 1,
                "username": "Bingus",
                "displayName": "User 0",
                "profile": null
            }
        },
        {
            "id": 4,
            "body": "This is just a post with text",
            "gitLink": null,
            "repoLink": null,
            "attachment": null,
            "public_id": null,
            "createdAt": "2024-08-18T14:10:10.740Z",
            "nextPostId": 6,
            "userId": 1,
            "_count": {
                "likes": 0,
                "comments": 0
            },
            "tags": [],
            "author": {
                "id": 1,
                "username": "Bingus",
                "displayName": "User 0",
                "profile": null
            }
        }
    ]
}

//Stuff to fetch
/*
- todiv 3 users
- recent 3 users 

- all posts daata 



STRUCTURE   
content-main | content-side
*/
