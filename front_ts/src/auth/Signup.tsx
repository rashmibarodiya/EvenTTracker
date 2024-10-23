
import  { useState } from 'react';
import {Link} from 'react-router-dom';
// import {useSetRecoilState} from "recoil";
// import {authState} from "../state/mg";
const url = import.meta.env.VITE_URL;

const Signup = () => {
    console.log("Signup component rendered***********************************",url);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    const handleSignup = async () => {
        const response = await fetch(`${url}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location.href ="/todos";
        } else {
            alert("Error while signing up");
        }
    };

    return (
        <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
            <div>

                hi signup
            <h2>Welcome !!</h2>
                <h4>Signup below</h4>
                
            
                Username : <input type='text'  onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <br/>
                Password : <input type='password'  onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <br/><br/>
                Already signed up? <Link to="/login">Login</Link>
                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
};

export default Signup;
