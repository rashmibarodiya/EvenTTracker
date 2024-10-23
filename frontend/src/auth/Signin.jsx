import { useRecoilState } from "recoil";
import { userName, password } from "../state/mg.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {} from 'react-router-dom';




function Signin() {
    const [username, setUsername] = useRecoilState(userName);
    const [passwordValue, setPassword] = useRecoilState(password);
    const navigate = useNavigate();
    const url = process.env.URL

    const handleSignin = async () => {
        const response = await axios.post(`${url}auth/login`,{
            username: username,
            password: passwordValue,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        
        })
        const data =  response.data
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location = "/todo";
        } else {
            alert("Error while signing up");
        }
    };


    return (
    
        <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
            <div>
                <h2>Welcome back !!</h2>
                <h4>Signin below</h4>
                
            
                Username : <input type='text'  onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <br/>
                Password : <input type='password'  onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <br/><br/>
                Already signed up? <Link to="/signup">Signup</Link>
                <button onClick={handleSignin}>Login</button>
            </div>
        </div>
    );
}

export default Signin;
