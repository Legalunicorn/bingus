import { Form, useNavigate } from "react-router-dom";
import "./searchUsers.scss"
import { IconSearch } from "@tabler/icons-react";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import ProfilePreview from "../../components/profilePreview/ProfilePreview";
import Loader from "../../components/Loaders/Loader";
import { toast } from "react-toastify";
const SearchUsers = () => {

    const myFetch = useFetch(); //useFetch returns a promise, json is already process. if error just 
    const [loading,setLoading] = useState(false);
    const [userList,setUserList] = useState([]);
    const queryRef = useRef();
    const navigate = useNavigate();

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
            // console.log("searching for: ",query)
            const data = await myFetch(`/users?search=${query}`);
            setUserList(data.users);
            setLoading(false);

        } catch(err){
            // console.log(err,'----------');
            setLoading(false);
            toast.warn("An Error has occured. Try again later.");
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
                    />
                </Form>
                <div className="results">
                    {loading
                    ? <Loader loading={loading}/>
                    :userList.length>0
                        ? userList.map(user=>(
                        <ProfilePreview
                            key={user.id}
                            user={user}
                            showFollow={false}
                            clickable={true}
                        />

                        ))
                        :
                        <p className="no-results">No results</p>
                    }
                </div>
            </div>
            

        </div>
    );
}
 
export default SearchUsers;
