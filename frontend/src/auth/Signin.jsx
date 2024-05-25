import { useRecoilState } from "recoil";
import { userName, password } from "../state/mg.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {} from 'react-router-dom';




function Signin() {
    const [username, setUsername] = useRecoilState(userName);
    const [passwordValue, setPassword] = useRecoilState(password);
    const navigate = useNavigate();
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/";

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

    // const handleSignin = () => {
    //     axios.post(`${url}auth/login`, {
    //         username: username,
    //         password: passwordValue,
    //     }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then((res) => {
    //         console.log("Signin response:", res);
    //         localStorage.setItem("token", res.data.token);
    //         // Ensure the Recoil state is updated
    //         setUsername(username); 
    //         navigate('/todo'); // Navigate to TodoList page
    //     }).catch((error) => {
    //         console.error("Error:", error);
    //         alert("Signin failed");
    //     });
    //};

    return (
        // <div>
        //     Welcome back!! Signin below
        //     <br />
        //     Username:
        //     <input
        //         type="text"
        //         placeholder="username"
        //         value={username}
        //         onChange={(e) => setUsername(e.target.value)}
        //     />
        //     <br />
        //     <br />
        //     Password:
        //     <input
        //         type="password"
        //         placeholder="password"
        //         value={passwordValue}
        //         onChange={(e) => setPassword(e.target.value)}
        //     />
        //     <br />
        //     Not Signed up?
        //     <br />
        //     <button onClick={handleSignin}>
        //         Signin
        //     </button>
        // </div>
        <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
            <div>
                <h2>Signin</h2>
                <input type='text'  onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type='password'  onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                Already signed up? <Link to="/signup">Signup</Link>
                <button onClick={handleSignin}>Login</button>
            </div>
        </div>
    );
}

export default Signin;
