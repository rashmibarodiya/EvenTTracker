import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userName, password } from "../state/atom.js";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
   // const [username, setUsername] = useRecoilState(userName);

    const username = useRecoilValue(userName)
    const setUsername = useSetRecoilState(userName)
    const [password, setPassword] = useRecoilState(password);
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/";

    return (
        <>
         <div>
             Welcome! Signed up below
         </div>
        <div>
           Username : 
           <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
           Password :
            <input
                type="password" // Changed to password type for better UX
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            Already Signed up?
            {/* <Link to="/login">Login</Link> */}
            <br />
            <button
                onClick={() => {
                    axios.post(`${url}auth/signup`, {
                        username: username,
                        password: password,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then((res) => {
                        console.log(res);
                        localStorage.setItem("token", res.data.token)
                        alert("Signed up successfully");
                    }).catch((error) => {
                        console.error("Error:", error);
                        alert("Signup failed");
                    });
                }}
            >
                Signup
            </button>
        </div>
        </>
    );
}

export default Signup;
