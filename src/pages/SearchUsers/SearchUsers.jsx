import { Form } from "react-router-dom";
import "./searchUsers.scss"
import { IconSearch } from "@tabler/icons-react";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import ProfilePreview from "../../components/profilePreview/ProfilePreview";
const SearchUsers = () => {

    const myFetch = useFetch(); //useFetch returns a promise, json is already process. if error just 
    const [error,setError] = useState();
    const [loading,setLoading] = useState(false);
    const [userList,setUserList] = useState([]);
    const queryRef = useRef();

    useEffect(()=>{
        const handleKeydown = (e)=>{
            if (e.key==='Enter') {
                handleSubmit(); //only remembers the first query value
            }
        }
        document.addEventListener("keydown",handleKeydown);

        return ()=> document.removeEventListener("keydown",handleKeydown)
    },[])

    const handleSubmit = async()=>{
        const query = queryRef.current.value;
        if (query.length==0) return; //dont execute
        setLoading(true);
        try{
            console.log("searching for: ",query)
            const data = await myFetch(`/users?search=${query}`);
            setUserList(data.users);
            setLoading(false);

        } catch(err){
            console.log(err);
            setLoading(false);
            setError(err.msg)
        }
        
    }

    return (
        <div className="content search-users">
            <div className="search">
                <Form>
                    <IconSearch/>
                    <input 
                        type="search"
                        placeholder={"Enter a username"}
                        ref={queryRef}
                        // onChange={(e)=>{setQuery(e.target.value);console.log("?",query)}}
                    />
                </Form>
                <div className="results">
                    {loading && <p>Loading</p>}
                    {userList.length>0
                    ? userList.map(user=>(
                        <ProfilePreview
                            user={user}
                            showFollow={false}
                        />
                    ))
                    :
                    <>
                        No results
                    </>
                    }
                </div>
            </div>
            

        </div>
    );
}
 
export default SearchUsers;


/*
frontend logic
-> i dont see a need to cache results
-> react query is overkill in this case

process
onSubmit -> send get request -> updating loading state
-> get results
pass: throw results inside a user state: each renderd inside a userPreview component 
fail; show error messasge 
*/