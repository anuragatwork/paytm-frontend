import { useEffect, useState } from "react"
import axios from "axios";
import PaginatedItems from "./PaginatedItems";

export const Users = () => {
    
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        //function to get users from backend
        async function getUsers(){
            const response= await axios.get("https://paytm-side-project.onrender.com/api/v1/user/bulk?filter=" + filter)
            
            setUsers(response.data.user);
        }
        getUsers();
        //will call everytime search filter changes
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <PaginatedItems  itemsPerPage={5} users={users} />
    </>
}

