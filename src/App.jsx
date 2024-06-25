import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { useEffect,useState } from "react";
import axios from 'axios';
/*

when the page loads there should be a request to check if there is token and if that is valid
if yes then direct to dashboard else direct to sign in

*/
function App() {
  //to check if a valid token(auth) exist in local storage
  const [validToken,setValidToken]=useState(false);
  // if valid token exist set flag to true
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem("token")
        }
      };
      try {
        const res = await axios.get('https://paytm-side-project.onrender.com/api/v1/me',config);
        console.log(res);
        if (res.data.valid) {
          setValidToken(true);
        }
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
       <BrowserRouter>
        <Routes>

          <Route path="/" index  element={validToken?<Dashboard/>:<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
