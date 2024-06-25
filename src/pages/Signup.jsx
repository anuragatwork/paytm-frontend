import { useState,useEffect } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // if aleady signed in navigate to dashboard
    useEffect(() => {
      if(localStorage.getItem("token")!=null){
        fetchData();
      }
      const fetchData = async () => {
        const config = {
          headers: {
            'Authorization': 'Bearer '+ localStorage.getItem("token")
          }
        };
        try {
          const res = await axios.get('http://localhost:3000/api/v1/me',config);
          console.log(res);
          if (res.data.valid) {
            alert("you are already signed in please log out first to visit signup")
            navigate('/dashboard')
          }
        } catch (e) {
          console.log("Error fetching data:", e);
        }
      };
    
      
    }, []);

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="user@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            if(password.length<=6){
              alert("password should be more than 6 letters")
            }
            else{
              try{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                  username,
                  firstName,
                  lastName,
                  password
                });
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
              }
              catch(e){
                console.log(e);
                alert("please check credentials/ enter valid one");
                
              }
            }
            
            
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}