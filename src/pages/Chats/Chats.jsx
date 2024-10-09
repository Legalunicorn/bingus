//Chat itself is a component
// the purpose of this is to tender a list of chats
// Back Nav "chats"
// Search bar for existing list + "plus button (redirect)"
// show list as such

//okay but how do i redirect to a chat itself through?
//this chats page should accept a params 
//the chatId should 
import "./chats.scss"
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DM from "../../components/DM/DM";
import { useAuthContext } from "../../hooks/useAuthContext";
import ChatPreview from "../../components/profilePreview/ChatPreview";
import BackNav from "../../components/backNav/BackNav";

const Chats = () => {
    //TODO check URL params such to set the activeChat if needed
    const {user} = useAuthContext();
    const [searchParams] = useSearchParams();

    //might need to rework this
    //instead of active chat, we just have a params s oits actually useless

    //README phase out
    const [activeChat,setActiveChat] = useState(null); //null means chatlist page
    const myFetch = useFetch();

    //README moved dm to its own page 
    // useEffect(()=>{
    //     //check the search params
    //     const chatParam = searchParams.get("chat")
    //     if (chatParam){
    //         setActiveChat(Number(chatParam));
    //     }
    // },[activeChat])

    const {data,isPending,isError} = useQuery({
        queryFn: ()=>myFetch('/chats'),
        queryKey:['chats']

    })

    if (isPending) return <>f</>

    console.log("---",data)

    return (
        <div className="content chats">
            <div>
                <BackNav label="Messages"/>
                {!isPending && data.chats.length &&
                    <div className="chat-list">
                        {data.chats.map(chat=>(
                            <ChatPreview
                                chat={chat}
                            />))}
                    </div>
                }
                
            </div>
            <div>
                empty side bar to delete
            </div>
        </div>

    );
}
 
export default Chats;