import { useState,useEffect } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const [balance,setBalance]=useState(0);
    const[username,setUsername]=useState('-');
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          //no local storage token available
          if(localStorage.getItem("token")==null){
            alert("you cant access dashboard please login first")
            navigate('/signin')
          }
          //config for header to send for get req
          const config = {
            headers: {
              'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
          };
          try {
            const res = await axios.get('https://paytm-side-project.onrender.com/api/v1/me',config);
            //set required variables
            setBalance(parseInt(res.data.balance));
            setUsername(res.data.name[0].toUpperCase());

          } catch (e) {
            console.log("Error fetching data:", e);
          }
        };
      
        fetchData();
      }, []);


    return <div>
        <Appbar name={username}/>
        <div className="m-8 font-bold">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}