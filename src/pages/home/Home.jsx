//Home page . ie Feed
import { useState } from "react";
import "./home.scss"
import PostCard from "../../components/postCard/PostCard";





const Home = () => {
    const [feedSort,setFeedSort] = useState('recent') //or TOP 


    return (
        <div className="content" id="home-page">
            <div className="content-main">
                {/* ---here are a tone of posts--- */}
       
                {idk.posts.map(post=>(
                    <PostCard
                        post={post}
                    />
                ))}

            </div>
            <div className="content-side">
                cock cock cock cock cock cock cock cock cock cock cock
            </div>
        </div>


    );
}
 
export default Home;

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
- top 3 users
- recent 3 users 

- all posts daata 



STRUCTURE   
content-main | content-side
*/
