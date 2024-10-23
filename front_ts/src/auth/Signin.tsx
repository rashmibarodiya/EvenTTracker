import { useState } from "react";
import { useRecoilState } from "recoil";
import { userName } from "../state/mg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 
function Signin() {
    const [username, setUsername] = useRecoilState(userName);
    const [password, setPassword] = useState(""); // Use local state for password
    const navigate = useNavigate();
    const url = process.env.URL;

    const handleSignin = async () => {
        console.log("handle signin");
        try {
            const response = await axios.post(`${url}/auth/login`, {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            if (data.token) {
                console.log("i got in");
                localStorage.setItem("token", data.token);
                navigate("/todo"); // Use navigate to change the route
            } else {
                alert("Error while signing up");
            }
        } catch (error) {
            console.error("Signin error:", error);
            if (axios.isAxiosError(error)) {
                console.error("Axios error details:", error.response?.data);
            }
            alert("An error occurred during sign-in. Please try again.");
        }
    };

    return (
        <div style={{ justifyContent: "center", display: "flex", width: "100%" }}>
            <div>
                <h2>Welcome back !!</h2>
                <h4>Signin below</h4>
                Username: <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <br />
                Password: <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <br /><br />
                Don't have an account? <Link to="/signup">Signup</Link>
                <button onClick={handleSignin}>Login</button>
            </div>
        </div>
    );
}

export default Signin;
